import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import productsData from '../data/Products';
import DOMPurify from 'dompurify';

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

  // Get product and category
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

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  const allProducts = productsData.flatMap((cat) =>
    cat.products.map((p) => ({
      ...p,
      category: cat.category,
    }))
  );

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
        {/* Images */}
        <div className='relative'>
          <div className='bg-white p-2 rounded shadow-md relative'>
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className='mx-auto object-cover w-full max-h-[600px]'
            />
            <button
              className='absolute top-4 right-4 bg-white p-2 rounded-full'
              onClick={() => setIsZoomed(true)}
            >
              <Search className='h-5 w-5 text-dark' />
            </button>
          </div>

          {/* Thumbnails */}
          <div className='grid grid-cols-5 gap-2 mt-4'>
            {images.map((img, idx) => (
              <div key={idx} className='h-[100px]'>
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
                  <span className='block w-full text-end'>{value}</span>
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

      {/* Modal Zoom */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='relative max-w-4xl w-full'
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className='absolute -top-2 -right-2 z-10 bg-white rounded-full p-2'
                onClick={() => setIsZoomed(false)}
              >
                <X className='h-5 w-5 text-black' />
              </button>
              <img
                src={selectedImage}
                alt='Zoomed'
                className='rounded shadow-lg w-full max-h-[80vh] object-contain'
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
