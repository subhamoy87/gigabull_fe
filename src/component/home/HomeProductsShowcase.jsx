import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';

export default function HomeProductsShowcase() {
  const { productsData } = useSiteData();

  // Flatten all products across all categories
  const allProducts = (productsData || []).flatMap((cat) =>
    (cat.products || []).map((p) => ({ ...p, categoryName: cat.category }))
  );

  // Filter products marked for Showcase by Admin (isShowcase === true)
  let displayedProducts = allProducts.filter((p) => p.isShowcase);

  // Fallback to model images or first products if no custom showcase products exist
  if (displayedProducts.length === 0) {
    const modelImages = allProducts.filter((p) => p.isModelImage);
    displayedProducts = modelImages.length > 0 ? modelImages.slice(0, 8) : allProducts.slice(0, 8);
  }

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='text-center pb-8'>
        <h1 className='heading-1'>Our Products</h1>
      </div>

      <p className='text-center text-body max-w-4xl mx-auto mb-16'>
        Experience The Elegance Of{' '}
        <span className='font-semibold'>Luxury Leather</span> With GIGABULL's
        Expertly Crafted Products. Each Piece Is Designed With Precision,
        Durability, And Style In Mind. Discover Our Collection And Elevate
        Your Everyday Essentials.
      </p>

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-y-20 gap-y-16 gap-x-2 sm:gap-x-8 mt-20'>
        {displayedProducts.map((product, index) => {
          const mainImage = product.images?.[0] || '';
          const subtitle = product.details?.color
            ? `${product.details.color} • ${product.details.material || 'Genuine Leather'}`
            : (product.details?.material || product.categoryName || 'Genuine Leather');

          return (
            <div key={product.slug || index} className='relative bg-ivory mx-2 sm:mx-4'>
              <div className='ring rounded-lg overflow-visible relative h-full flex flex-col justify-between'>
                <div className='ring-2 ring-primary -translate-y-10 hover:-translate-y-14 transition-all duration-300 cursor-pointer rounded-lg overflow-hidden mx-2 sm:mx-5 bg-white shadow-md'>
                  <Link to={`/product/${product.slug}`}>
                    <div className='aspect-square bg-white p-3 sm:p-4 flex items-center justify-center'>
                      <img
                        src={mainImage}
                        alt={product.name}
                        width={200}
                        height={200}
                        className='object-contain max-h-48 w-full h-full'
                      />
                    </div>
                  </Link>
                </div>
                <div className='pb-4 -mt-6 text-center px-2'>
                  <h3 className='sm:text-lg text-sm font-bold mb-1 text-gray-900 line-clamp-2'>
                    {product.name}
                  </h3>
                  <p className='text-gray-600 sm:text-sm text-xs line-clamp-2'>
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
