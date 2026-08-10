import React, { useState, useEffect } from 'react';
import { RCMCCertificate } from '../assets/pdfs';
import { certificateBannerImage } from '../assets/common';
import { useSiteData } from '../context/SiteDataContext';
import { SERVE_CERTIFICATE_API_URL } from '../config/config';
import { getIDBItem } from '../utils/idbStorage';

const CertificatePage = () => {
  const { documents } = useSiteData();
  const [blobUrl, setBlobUrl] = useState(null);
  const [certName, setCertName] = useState('RCMC Certificate.pdf');

  useEffect(() => {
    let active = true;
    let createdUrl = null;

    const resolvePdf = async () => {
      // 1. First priority: Check newly uploaded base64 PDF in state or IndexedDB
      let certData = documents?.certificateUrl;
      let name = documents?.certificateName;

      if (!certData || !certData.startsWith('data:')) {
        const idbCert = await getIDBItem('certificateUrl');
        const idbName = await getIDBItem('certificateName');
        if (idbCert) certData = idbCert;
        if (idbName) name = idbName;
      }

      if (name) setCertName(name);

      // If we have a base64 string, convert to Blob URL
      if (certData && typeof certData === 'string' && certData.startsWith('data:application/pdf;base64,')) {
        try {
          const base64Data = certData.replace(/^data:application\/pdf;base64,/, '').trim().replace(/[\r\n\s]/g, '');
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          createdUrl = URL.createObjectURL(blob);
          if (active) setBlobUrl(createdUrl);
          return;
        } catch (err) {
          console.error('Error converting base64 PDF to blob:', err);
        }
      }

      // 2. Second priority: Fetch custom uploaded PDF from server
      try {
        const res = await fetch(SERVE_CERTIFICATE_API_URL);
        if (res.ok) {
          const blob = await res.blob();
          if (blob.type === 'application/pdf' || blob.size > 100) {
            createdUrl = URL.createObjectURL(blob);
            if (active) setBlobUrl(createdUrl);
            return;
          }
        }
      } catch (err) {
        console.warn('Server PDF fetch note:', err);
      }

      // 3. Fallback: Default RCMCCertificate asset
      if (active) setBlobUrl(RCMCCertificate);
    };

    resolvePdf();

    return () => {
      active = false;
      if (createdUrl && createdUrl.startsWith('blob:')) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [documents?.certificateUrl, documents?.certificateName]);

  const pdfViewUrl = blobUrl || RCMCCertificate;

  return (
    <div className='w-full bg-white min-h-screen font-sans'>
      {/* Hero Section */}
      <div
        className='relative h-64 bg-cover bg-center'
        style={{
          backgroundImage: `url(${certificateBannerImage})`,
        }}
      >
        <div className='absolute inset-0 bg-black/40'></div>
        <div className='relative flex-center h-full'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold font-heading text-white'>
              RCMC Certificate
            </h1>
            <p className='text-lg text-white'>
              Issued by FIEO - Federation of Indian Export Organisations{' '}
            </p>
          </div>
        </div>
      </div>

      {/* PDF Viewer Container */}
      <div className='container mx-auto px-4 py-8'>
        <div className='w-full shadow-lg rounded-xl overflow-hidden border border-gray-300 bg-slate-900'>
          {/* PDF Top Document Header Toolbar */}
          <div className='bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xs uppercase'>
                PDF
              </div>
              <div>
                <h2 className='text-base font-bold text-white tracking-wide'>
                  {certName}
                </h2>
              </div>
            </div>
            <a
              href={pdfViewUrl}
              target='_blank'
              rel='noopener noreferrer'
              download={certName}
              className='inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition shadow-sm'
            >
              Download PDF
            </a>
          </div>

          <div style={{ height: '85vh' }}>
            <iframe
              src={pdfViewUrl}
              title={certName}
              width='100%'
              height='100%'
              style={{ border: 'none' }}
              className='w-full h-full'
            />
          </div>
        </div>

        {/* Fallback message */}
        <div className='text-center mt-4 text-sm text-gray-500'>
          <p>
            Can’t view the certificate?{' '}
            <a
              href={pdfViewUrl}
              target='_blank'
              rel='noopener noreferrer'
              download={certName}
              className='text-blue-600 font-semibold underline hover:text-blue-800 transition'
            >
              Download {certName}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
