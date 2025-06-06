import React from 'react';
import { RCMCCertificate } from '../assets/pdfs';
import { certificateBannerImage } from '../assets/common';

const CertificatePage = () => {
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
        <div className='w-full' style={{ height: '80vh' }}>
          <iframe
            src={RCMCCertificate}
            title='RCMC Certificate'
            width='100%'
            height='100%'
            style={{ border: '1px solid #ccc' }}
          />
        </div>

        {/* Fallback message */}
        <div className='text-center mt-4 text-sm text-gray-500'>
          <p>
            Can’t view the certificate?{' '}
            <a
              href='/rcmc-certificate.pdf'
              target='_blank'
              rel='noopener noreferrer'
              download={true}
              className='text-blue-600 underline'
            >
              Download it here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
