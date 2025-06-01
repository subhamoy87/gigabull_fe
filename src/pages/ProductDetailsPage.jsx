import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import productsData from '../data/Products';
import DOMPurify from 'dompurify';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

export function formatDescription(htmlString) {
  const clean = DOMPurify.sanitize(htmlString);
  const withParagraphs = clean
    .split(/\n{3,}/g)
    .map((block) => `<p>${block.replace(/\n/g, '<br/>')}</p>`)
    .join('');
  return withParagraphs;
}

export default function ProductDetailsPage() {
  const { slug } = useParams();

  // Find the selected product and its category
  let selectedProduct = null;
  let categoryName = '';
  for (const category of productsData) {
    const product = category.products.find((p) => p.slug === slug);
    if (product) {
      selectedProduct = product;
      categoryName = category.category;
      break;
    }
  }

  if (!selectedProduct) {
    return (
      <div className='container mx-auto py-16 text-center'>
        <h1 className='text-3xl font-bold text-red-500'>Product Not Found</h1>
      </div>
    );
  }

  const { name, images, details, tags } = selectedProduct;

  // Local state for which image is currently displayed, and whether the lightbox is open
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Whenever the `images` array changes (i.e. user navigates to a different product),
  // reset selectedImage to the first image and make sure the lightbox is closed.
  useEffect(() => {
    setSelectedImage(images[0]);
    setIsLightboxOpen(false);
  }, [images]);

  // Build a flat list of all products (with category attached) in order to compute related products
  const allProducts = productsData.flatMap((cat) =>
    cat.products.map((p) => ({
      ...p,
      category: cat.category,
    }))
  );

  // Filter out the current product, then pick up to 4 that share at least one tag
  const relatedProducts = allProducts
    .filter((p) => p.slug !== slug && p.tags.some((tag) => tags.includes(tag)))
    .slice(0, 4);

  return (
    <div className='max-w-7xl mx-auto px-4 py-8 bg-white'>
      {/* Breadcrumbs */}
      <div className='flex items-center sm:text-sm text-xs mb-6'>
        <Link to='/' className='text-dark hover:text-primary'>
          Home
        </Link>
        <ChevronRight className='h-4 w-4 mx-1 text-gray-400' />
        <Link
          to={`/${categoryName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/'/g, '')}`}
          className='text-dark hover:text-primary'
        >
          {categoryName}
        </Link>
        <ChevronRight className='h-4 w-4 mx-1 text-gray-400' />
        <span className='text-gray-500 sm:hidden block'>
          {name.length > 20 ? `${name.slice(0, 20)}...` : name}
        </span>
        <span className='text-gray-500 sm:block hidden'>{name}</span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Images Section */}
        <div className='relative'>
          <div className='bg-white p-2 rounded shadow-md relative'>
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className='mx-auto object-cover aspect-square w-full max-h-[600px]'
            />
            <button
              className='absolute top-4 right-4 bg-white p-2 rounded-full'
              onClick={() => setIsLightboxOpen(true)}
            >
              <Search className='h-5 w-5 text-dark' />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className='grid grid-cols-5 gap-2 lg:gap-5 mt-4'>
            {images.map((img, idx) => (
              <div key={idx} className='h-[100px] md:h-[80px] lg:h-[100px]'>
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`mx-auto object-cover bg-[#D8CADD] aspect-square cursor-pointer border ${
                    selectedImage === img
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className='text-2xl font-bold text-dark text-shadow-2xs mb-6'>
            {name}
          </h1>
          <div className='space-y-8'>
            {Object.entries(details)
              .filter(([key, value]) => key !== 'description' && value != null)
              .map(([key, value]) => (
                <div key={key} className='flex text-xl'>
                  <span className='font-semibold w-40 whitespace-nowrap capitalize text-dark'>
                    {key
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}{' '}
                    –
                  </span>
                  <span className='block w-full ml-16'>{value}</span>
                </div>
              ))}
          </div>

          <Link
            to='/contact'
            state={{ productName: name, productSlug: slug }}
            className='block text-center w-full mt-6 py-3 font-medium text-white rounded bg-[#424EA3]'
          >
            Send Enquiry
          </Link>
        </div>
      </div>

      {/* Product Description */}
      {details.description && (
        <div className='mt-16'>
          <h2 className='text-2xl font-bold mb-4 text-dark'>
            Product Description
          </h2>
          <div
            className='text-text leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: formatDescription(details.description),
            }}
          />
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className='mt-16'>
          <h2 className='text-2xl font-bold mb-6 text-dark'>
            Related Products
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6'>
            {relatedProducts.map((product) => (
              <Link
                to={`/product/${product.slug}`}
                key={product.slug}
                className='border rounded-md overflow-hidden hover:shadow-md transition'
              >
                <div className='bg-gradient-to-r from-yellow-100 to-orange-100 p-0'>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className='mx-auto h-auto lg:h-[250px] aspect-square w-full object-cover'
                  />
                </div>
                <div className='p-4'>
                  <div className='text-sm text-gray-500 mb-1'>
                    {product.category}
                  </div>
                  <h3 className='font-medium text-dark'>{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox with Zoom Plugin */}
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={images.map((img) => ({ src: img }))}
          plugins={[Zoom]}
        />
      )}
    </div>
  );
}
