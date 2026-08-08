import React from 'react';
import { BrochureGigabull2025 } from '../assets/pdfs';
import { brochureBannerImage } from '../assets/common';
import { useSiteData } from '../context/SiteDataContext';

const BrochurePage = () => {
  const { documents } = useSiteData();
  const brochureUrl = documents?.brochureUrl || BrochureGigabull2025;

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

        {/* PDF Viewer */}
        <div className='w-full' style={{ height: '80vh' }}>
          <iframe
            src={brochureUrl}
            title='Leather Products Brochure'
            width='100%'
            height='100%'
            style={{ border: '1px solid #ccc' }}
          />
        </div>

        {/* Fallback message for unsupported browsers */}
        <div className='text-center mt-4 text-sm text-gray-500'>
          <p>
            Can’t view the brochure?{' '}
            <a
              href={brochureUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline'
              download='BrochureGigabull2025.pdf'
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

export default BrochurePage;
