import React, { useState, useEffect } from 'react';
import { certificateBannerImage } from '../assets/common';
import { useSiteData } from '../context/SiteDataContext';
import { getSupabaseStorageUrl, isSupabaseConfigured } from '../config/supabaseClient';

const CertificatePage = () => {
  const { documents } = useSiteData();

  // Supabase Storage direct bucket URL (pdfs/rcmc-certificate.pdf)
  const defaultSupabaseUrl = isSupabaseConfigured()
    ? getSupabaseStorageUrl('pdfs/rcmc-certificate.pdf')
    : null;

  // Strictly fetch from Supabase Storage
  const pdfViewUrl = documents?.certificateUrl || defaultSupabaseUrl;
  const certName = documents?.certificateName || 'RCMC Certificate.pdf';

  const [pdfStatus, setPdfStatus] = useState({ checking: true, exists: true });

  // Verify whether the PDF file exists at the Supabase Storage URL
  useEffect(() => {
    if (!pdfViewUrl) {
      setPdfStatus({ checking: false, exists: false });
      return;
    }
    setPdfStatus({ checking: true, exists: true });
    fetch(pdfViewUrl, { method: 'HEAD' })
      .then((res) => {
        if (res.ok || res.status === 200 || res.status === 304) {
          setPdfStatus({ checking: false, exists: true });
        } else {
          setPdfStatus({ checking: false, exists: false });
        }
      })
      .catch(() => {
        // If HEAD is blocked by CORS, assume file exists so iframe can load it
        setPdfStatus({ checking: false, exists: true });
      });
  }, [pdfViewUrl]);

  // Direct Frontend Blob Download Handler
  const handleDownloadPdf = async (e) => {
    e.preventDefault();
    if (!pdfViewUrl) return;

    try {
      const response = await fetch(pdfViewUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = certName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.warn('Direct blob download notice, opening in new tab:', err);
      window.open(pdfViewUrl, '_blank');
    }
  };

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
            <button
              onClick={handleDownloadPdf}
              className='inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition shadow-sm cursor-pointer'
            >
              Download PDF
            </button>
          </div>

          <div style={{ height: '85vh', position: 'relative' }} className='bg-slate-900 w-full'>
            {pdfStatus.checking ? (
              <div className='flex flex-col items-center justify-center h-full text-amber-400 gap-2'>
                <div className='w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin'></div>
                <span className='text-xs font-semibold text-slate-400'>Loading Certificate from Supabase Storage...</span>
              </div>
            ) : pdfStatus.exists && pdfViewUrl ? (
              <iframe
                src={pdfViewUrl}
                title={certName}
                width='100%'
                height='100%'
                className='w-full h-full border-0'
                style={{
                  border: 'none',
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <div className='flex flex-col items-center justify-center h-full text-slate-400 text-sm gap-3 p-6 text-center'>
                <p className='text-amber-400 font-bold text-base'>Certificate PDF Not Found in Supabase Storage</p>
                <p className='text-xs text-slate-400 max-w-md'>
                  Please log into the Admin Panel $\rightarrow$ PDF File Manager and upload your RCMC Certificate PDF file into your Supabase Storage bucket.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Fallback message */}
        <div className='text-center mt-4 text-sm text-gray-500'>
          <p>
            Can’t view the certificate?{' '}
            <button
              onClick={handleDownloadPdf}
              className='text-blue-600 font-semibold underline hover:text-blue-800 transition cursor-pointer'
            >
              Download {certName}
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
