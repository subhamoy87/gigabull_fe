import React, { useMemo } from 'react';
import { RCMCCertificate } from '../assets/pdfs';
import { certificateBannerImage } from '../assets/common';
import { useSiteData } from '../context/SiteDataContext';

const CertificatePage = () => {
  const { documents } = useSiteData();
  const rawCertUrl = documents?.certificateUrl || RCMCCertificate;
  const certName = documents?.certificateName || 'RCMCCertificate.pdf';

  const pdfViewUrl = useMemo(() => {
    if (!rawCertUrl) return RCMCCertificate;
    if (typeof rawCertUrl === 'string' && rawCertUrl.startsWith('data:application/pdf;base64,')) {
      try {
        const base64Data = rawCertUrl.replace(/^data:application\/pdf;base64,/, '').trim();
        if (!base64Data) return RCMCCertificate;

        const cleanedBase64 = base64Data.replace(/[\r\n\s]/g, '');
        const byteCharacters = atob(cleanedBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const pdfFile = new File([byteArray], certName, { type: 'application/pdf' });
        return URL.createObjectURL(pdfFile);
      } catch (err) {
        console.error('Error creating PDF Blob URL:', err);
        return RCMCCertificate;
      }
    }
    return rawCertUrl;
  }, [rawCertUrl, certName]);

  const pdfDisplayUrl = `${pdfViewUrl}#filename=${encodeURIComponent(certName)}`;

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

      {/* PDF Viewer */}
      <div className='container mx-auto px-4 py-8'>
        <div className='w-full shadow-md rounded-xl overflow-hidden border border-gray-300' style={{ height: '85vh' }}>
          <object
            data={pdfDisplayUrl}
            type='application/pdf'
            title={certName}
            width='100%'
            height='100%'
            className='w-full h-full'
          >
            <iframe
              src={pdfDisplayUrl}
              title={certName}
              width='100%'
              height='100%'
              style={{ border: 'none' }}
            />
          </object>
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
