import React from 'react';
import { BrochureGigabull2025 } from '../assets/pdfs';
import { brochureBannerImage } from '../assets/common';
import { useSiteData } from '../context/SiteDataContext';

const BrochurePage = () => {
  const { documents } = useSiteData();
  const gdriveId = documents?.brochureGDriveId;

  const pdfViewUrl = gdriveId
    ? `https://drive.google.com/file/d/${gdriveId}/preview`
    : BrochureGigabull2025;

  const downloadUrl = gdriveId
    ? `https://drive.google.com/uc?export=download&id=${gdriveId}`
    : BrochureGigabull2025;

  const brochureName = (documents?.brochureName && !documents.brochureName.startsWith('Google Drive File'))
    ? documents.brochureName
    : 'Brochure Gigabull.pdf';

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
              href={downloadUrl}
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
              href={downloadUrl}
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
