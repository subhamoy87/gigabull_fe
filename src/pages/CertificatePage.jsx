import React, { useMemo, useState, useEffect } from 'react';
import { RCMCCertificate } from '../assets/pdfs';
import { certificateBannerImage } from '../assets/common';
import { useSiteData } from '../context/SiteDataContext';
import { SERVE_CERTIFICATE_API_URL } from '../config/config';
import { getIDBItem } from '../utils/idbStorage';

const CertificatePage = () => {
  const { documents } = useSiteData();
  const [idbCert, setIdbCert] = useState(null);
  const [idbCertName, setIdbCertName] = useState(null);
  const [hasServerCert, setHasServerCert] = useState(false);

  useEffect(() => {
    const loadIDBCert = async () => {
      const storedCert = await getIDBItem('certificateUrl');
      const storedName = await getIDBItem('certificateName');
      if (storedCert) setIdbCert(storedCert);
      if (storedName) setIdbCertName(storedName);
    };
    loadIDBCert();
  }, [documents?.certificateUrl]);

  useEffect(() => {
    fetch(SERVE_CERTIFICATE_API_URL, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHasServerCert(true);
      })
      .catch(() => {});
  }, [documents?.certificateUrl]);

  const rawCertUrl = idbCert || documents?.certificateUrl || RCMCCertificate;
  const certName = idbCertName || documents?.certificateName || 'RCMC Certificate.pdf';

  const pdfViewUrl = useMemo(() => {
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
    if (hasServerCert) {
      return SERVE_CERTIFICATE_API_URL;
    }
    if (!rawCertUrl) return RCMCCertificate;
    return rawCertUrl;
  }, [rawCertUrl, certName, hasServerCert]);

  const pdfDisplayUrl = `${pdfViewUrl}#filename=${encodeURIComponent('RCMC Certificate.pdf')}`;

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
                  RCMC Certificate
                </h2>
              </div>
            </div>
            <a
              href={pdfViewUrl}
              target='_blank'
              rel='noopener noreferrer'
              download='RCMC Certificate.pdf'
              className='inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition shadow-sm'
            >
              Download PDF
            </a>
          </div>

          <div style={{ height: '85vh' }}>
            <object
              data={pdfDisplayUrl}
              type='application/pdf'
              title='RCMC Certificate'
              width='100%'
              height='100%'
              className='w-full h-full'
            >
              <iframe
                src={pdfDisplayUrl}
                title='RCMC Certificate'
                width='100%'
                height='100%'
                style={{ border: 'none' }}
              />
            </object>
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
              download='RCMC Certificate.pdf'
              className='text-blue-600 font-semibold underline hover:text-blue-800 transition'
            >
              Download RCMC Certificate
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
