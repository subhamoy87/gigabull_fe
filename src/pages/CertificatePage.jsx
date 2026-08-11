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
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          throw new Error('Supabase returned 404 JSON response instead of PDF file');
        }
        const arrayBuffer = await response.arrayBuffer();
        const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
        const localUrl = window.URL.createObjectURL(pdfBlob);
        if (isMounted) {
          setBlobUrl(localUrl);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('PDF fetch error:', err.message);
        if (isMounted) {
          setBlobUrl(null);
          setPdfError(true);
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
              {!pdfError && (
                <a
                  href={pdfViewUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-lg transition cursor-pointer border border-slate-700'
                >
                  Open Fullscreen
                </a>
              )}
              <button
                onClick={handleDownloadPdf}
                disabled={pdfError}
                className={`inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition shadow-sm ${pdfError ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                Download PDF
              </button>
            </div>
          </div>

          <div style={{ height: '85vh', position: 'relative' }} className='bg-slate-900 w-full'>
            {loading ? (
              <div className='flex flex-col items-center justify-center h-full text-amber-400 gap-3'>
                <div className='w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin'></div>
                <span className='text-xs font-semibold text-slate-400 tracking-wide'>Loading Certificate PDF from Supabase Storage...</span>
              </div>
            ) : pdfError || !blobUrl ? (
              <div className='flex flex-col items-center justify-center h-full text-slate-400 text-sm gap-3 p-6 text-center'>
                <div className='w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xl mb-1'>
                  !
                </div>
                <p className='text-amber-400 font-bold text-base'>Certificate PDF Not Found in Supabase Storage</p>
                <p className='text-xs text-slate-400 max-w-md leading-relaxed'>
                  The PDF document file has not been uploaded to your Supabase Storage bucket yet.
                  <br /><br />
                  Please log into <strong>Admin Panel $\rightarrow$ PDF File Manager</strong> tab and upload your RCMC Certificate PDF file.
                </p>
              </div>
            ) : (
              <iframe
                src={blobUrl}
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
              disabled={pdfError}
              className='text-blue-600 font-semibold underline hover:text-blue-800 transition cursor-pointer disabled:opacity-50'
            >
              Download {certName}
            </button>
            {!pdfError && (
              <>
                {' '}or{' '}
                <a
                  href={pdfViewUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 font-semibold underline hover:text-blue-800 transition'
                >
                  Open in New Tab
                </a>
              </>
            )}
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
