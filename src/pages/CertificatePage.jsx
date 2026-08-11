import React, { useState, useEffect } from 'react';
// import { RCMCCertificate } from '../assets/pdfs'; // Local PDF fallback import (disabled)
import { certificateBannerImage } from '../assets/common';
import { useSiteData } from '../context/SiteDataContext';
import { getSupabaseStorageUrl, isSupabaseConfigured } from '../config/supabaseClient';

const CertificatePage = () => {
  const { documents } = useSiteData();

  // Supabase Storage direct bucket URL (pdfs/rcmc-certificate.pdf)
  const defaultSupabaseUrl = isSupabaseConfigured()
    ? getSupabaseStorageUrl('pdfs/rcmc-certificate.pdf')
    : null;

  // Strictly fetch from Supabase Storage only (Local fallback disabled in comment below)
  const pdfViewUrl = documents?.certificateUrl || defaultSupabaseUrl; // || RCMCCertificate;
  const certName = documents?.certificateName || 'RCMC Certificate.pdf';

  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);

  // Fetch the PDF from Supabase as a local Blob URL for same-origin iframe rendering
  useEffect(() => {
    if (!pdfViewUrl) {
      setLoading(false);
      setPdfError(true);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setPdfError(false);

    fetch(pdfViewUrl)
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
        const localUrl = window.URL.createObjectURL(pdfBlob);
        if (isMounted) {
          setBlobUrl(localUrl);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch PDF Blob, falling back to direct URL:', err);
        if (isMounted) {
          // If direct fetch fails (e.g. 404 or CORS), set direct URL as fallback
          setBlobUrl(pdfViewUrl);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      if (blobUrl && blobUrl.startsWith('blob:')) {
        window.URL.revokeObjectURL(blobUrl);
      }
    };
  }, [pdfViewUrl]);

  // Direct Frontend Blob Download Handler (Ensures clean uncorrupted PDF file downloads)
  const handleDownloadPdf = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!pdfViewUrl) return;

    try {
      const response = await fetch(pdfViewUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = certName.endsWith('.pdf') ? certName : `${certName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.warn('Direct blob download notice, opening in new tab:', err);
      window.open(pdfViewUrl, '_blank');
    }
  };

  const gviewUrl = pdfViewUrl
    ? `https://docs.google.com/gview?url=${encodeURIComponent(pdfViewUrl)}&embedded=true`
    : '';

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
            <div className='flex items-center gap-2'>
              <a
                href={pdfViewUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition cursor-pointer border border-slate-700'
              >
                Open Fullscreen
              </a>
              <button
                onClick={handleDownloadPdf}
                className='inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition shadow-sm cursor-pointer'
              >
                Download PDF
              </button>
            </div>
          </div>

          <div style={{ height: '85vh', position: 'relative' }} className='bg-slate-900 w-full'>
            {loading ? (
              <div className='flex flex-col items-center justify-center h-full text-amber-400 gap-3'>
                <div className='w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin'></div>
                <span className='text-xs font-semibold text-slate-400 tracking-wide'>Loading Certificate PDF...</span>
              </div>
            ) : pdfError ? (
              <div className='flex flex-col items-center justify-center h-full text-slate-400 text-sm gap-3 p-6 text-center'>
                <p className='text-amber-400 font-bold text-base'>Certificate PDF Not Found in Supabase Storage</p>
                <p className='text-xs text-slate-400 max-w-md'>
                  Please log into Admin Panel $\rightarrow$ PDF File Manager and upload your RCMC Certificate PDF into your Supabase Storage bucket.
                </p>
              </div>
            ) : (
              <iframe
                src={blobUrl || gviewUrl || pdfViewUrl}
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
            {' '}or{' '}
            <a
              href={pdfViewUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 font-semibold underline hover:text-blue-800 transition'
            >
              Open in New Tab
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
