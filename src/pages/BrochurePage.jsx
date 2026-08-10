import React, { useState, useEffect } from 'react';
import { BrochureGigabull2025 } from '../assets/pdfs';
import { brochureBannerImage } from '../assets/common';
import { useSiteData } from '../context/SiteDataContext';
import { SERVE_BROCHURE_API_URL } from '../config/config';
import { getIDBItem } from '../utils/idbStorage';

const BrochurePage = () => {
  const { documents } = useSiteData();
  const [blobUrl, setBlobUrl] = useState(null);
  const [brochureName, setBrochureName] = useState('Brochure Gigabull.pdf');

  useEffect(() => {
    let active = true;
    let createdUrl = null;

    const resolvePdf = async () => {
      // 1. First priority: Check newly uploaded base64 PDF in state or IndexedDB
      let brochData = documents?.brochureUrl;
      let name = documents?.brochureName;

      if (!brochData || !brochData.startsWith('data:')) {
        const idbBroch = await getIDBItem('brochureUrl');
        const idbName = await getIDBItem('brochureName');
        if (idbBroch) brochData = idbBroch;
        if (idbName) name = idbName;
      }

      if (name) setBrochureName(name);

      // If we have a base64 string, convert to Blob URL
      if (brochData && typeof brochData === 'string' && brochData.startsWith('data:application/pdf;base64,')) {
        try {
          const base64Data = brochData.replace(/^data:application\/pdf;base64,/, '').trim().replace(/[\r\n\s]/g, '');
          const byteCharacters = atob(base64Data);
          const byteArray = new Uint8Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
          }
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          createdUrl = URL.createObjectURL(blob);
          if (active) setBlobUrl(createdUrl);
          return;
        } catch (err) {
          console.error('Error converting base64 brochure to blob:', err);
        }
      }

      // 2. Second priority: Fetch custom uploaded PDF from server
      try {
        const res = await fetch(SERVE_BROCHURE_API_URL);
        if (res.ok) {
          const blob = await res.blob();
          if (blob.type === 'application/pdf' || blob.size > 100) {
            createdUrl = URL.createObjectURL(blob);
            if (active) setBlobUrl(createdUrl);
            return;
          }
        }
      } catch (err) {
        console.warn('Server Brochure fetch note:', err);
      }

      // 3. Fallback: Default BrochureGigabull2025 asset
      if (active) setBlobUrl(BrochureGigabull2025);
    };

    resolvePdf();

    return () => {
      active = false;
      if (createdUrl && createdUrl.startsWith('blob:')) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [documents?.brochureUrl, documents?.brochureName]);

  const pdfViewUrl = blobUrl || BrochureGigabull2025;

  return (
    <div className='w-full bg-white font-sans min-h-screen'>
      {/* Hero Section */}
      <div
        className='relative h-64 bg-cover bg-center'
        style={{
          backgroundImage: `url(${brochureBannerImage})`,
        }}
      >
        <div className='absolute inset-0 bg-black/40'></div>
        <div className='relative flex-center h-full'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold font-heading text-white'>
              Product Brochure{' '}
            </h1>
            <p className='text-lg text-white'>
              Explore our detailed catalog of premium leather goods.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='container mx-auto px-4 py-8'>
        <p className='text-lg text-center text-gray-700 mb-6'>
          Our brochure offers a comprehensive look at the materials,
          craftsmanship, and styles we offer across our collections. You can
          scroll or download the brochure to get a closer look at each product's
          unique features.
        </p>

        {/* PDF Viewer Container */}
        <div className='w-full shadow-lg rounded-xl overflow-hidden border border-gray-300 bg-slate-900'>
          {/* PDF Top Document Header Toolbar */}
          <div className='bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xs uppercase'>
                PDF
              </div>
              <div>
                <h2 className='text-base font-bold text-white tracking-wide'>
                  {brochureName}
                </h2>
              </div>
            </div>
            <a
              href={pdfViewUrl}
              target='_blank'
              rel='noopener noreferrer'
              download={brochureName}
              className='inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition shadow-sm'
            >
              Download PDF
            </a>
          </div>

          <div style={{ height: '85vh' }}>
            <iframe
              src={pdfViewUrl}
              title={brochureName}
              width='100%'
              height='100%'
              style={{ border: 'none' }}
              className='w-full h-full'
            />
          </div>
        </div>

        {/* Fallback message for unsupported browsers */}
        <div className='text-center mt-4 text-sm text-gray-500'>
          <p>
            Can’t view the brochure?{' '}
            <a
              href={pdfViewUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 font-semibold underline hover:text-blue-800 transition'
              download={brochureName}
            >
              Download {brochureName}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrochurePage;
