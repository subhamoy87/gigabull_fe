import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteData } from '../context/SiteDataContext';
import DOMPurify from 'dompurify';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import ZoomableImage from '../component/others/ZoomableImage';
import EnquiryModal from '../component/others/EnquiryModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productsData } = useSiteData();

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

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setSelectedImage(images[0]);
    setIsLightboxOpen(false);
  }, [images]);

  const currentIndex = images.indexOf(selectedImage);

  const handlePrevImage = () => {
    if (!images || images.length <= 1) return;
    const currIdx = images.indexOf(selectedImage);
    const prevIdx = currIdx <= 0 ? images.length - 1 : currIdx - 1;
    setSelectedImage(images[prevIdx]);
  };

  const handleNextImage = () => {
    if (!images || images.length <= 1) return;
    const currIdx = images.indexOf(selectedImage);
    const nextIdx = currIdx >= images.length - 1 ? 0 : currIdx + 1;
    setSelectedImage(images[nextIdx]);
  };

  const allProducts = productsData.flatMap((cat) =>
    cat.products.map((p) => ({
      ...p,
      category: cat.category,
    }))
  );

  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.slug !== slug &&
        p.category === categoryName &&
        p.tags.some((tag) => tags.includes(tag))
    )
    .sort((a, b) => {
      const aMatchCount = a.tags.filter((tag) => tags.includes(tag)).length;
      const bMatchCount = b.tags.filter((tag) => tags.includes(tag)).length;
      return bMatchCount - aMatchCount;
    })
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
        <div className='relative w-full max-w-[580px] mx-auto'>
          {/* Main Canvas with Side Navigation Controls */}
          <div className='flex items-center justify-between gap-2 sm:gap-3'>
            {/* Previous Arrow Button */}
            {images && images.length > 1 ? (
              <button
                type='button'
                onClick={handlePrevImage}
                className='p-2.5 sm:p-3 rounded-full bg-white hover:bg-black text-gray-800 hover:text-white shadow-md border border-gray-200 transition-all duration-200 cursor-pointer shrink-0 hover:scale-105 active:scale-95'
                title='Previous Image'
                aria-label='Previous Image'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>
            ) : (
              <div className='w-10 sm:w-11 shrink-0' />
            )}

            {/* 500px Image Canvas Box */}
            <div className='bg-white rounded-2xl p-4 shadow-md relative w-full max-w-[500px] h-[360px] sm:h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden border border-gray-200 shrink-0 flex-1'>
              {/* <ZoomableImage name={name} selectedImage={selectedImage} /> */}
              <motion.img
                key={selectedImage}
                src={selectedImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className='max-h-full max-w-full w-full h-full object-contain mx-auto select-none'
              />

              {/* Image Counter Badge */}
              {images && images.length > 1 && (
                <div className='absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow select-none'>
                  {currentIndex >= 0 ? currentIndex + 1 : 1} / {images.length}
                </div>
              )}

              {/* Zoom Button */}
              <button
                className='absolute top-4 right-4 bg-gray-100/90 hover:bg-gray-200 text-gray-800 p-2.5 rounded-full shadow transition-all cursor-pointer hover:scale-105'
                onClick={() => setIsLightboxOpen(true)}
                title='Zoom Image'
              >
                <Search className='h-5 w-5 text-dark' />
              </button>
            </div>

            {/* Next Arrow Button */}
            {images && images.length > 1 ? (
              <button
                type='button'
                onClick={handleNextImage}
                className='p-2.5 sm:p-3 rounded-full bg-white hover:bg-black text-gray-800 hover:text-white shadow-md border border-gray-200 transition-all duration-200 cursor-pointer shrink-0 hover:scale-105 active:scale-95'
                title='Next Image'
                aria-label='Next Image'
              >
                <ChevronRight className='h-5 w-5' />
              </button>
            ) : (
              <div className='w-10 sm:w-11 shrink-0' />
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className='overflow-x-auto mt-4 pb-1 px-1 sm:px-12'>
            <div className='flex gap-3 lg:gap-4 w-max mx-auto'>
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`h-[88px] w-[88px] flex-shrink-0 rounded-xl overflow-hidden bg-white border-2 transition cursor-pointer p-1.5 ${
                    selectedImage === img
                      ? 'border-primary shadow-sm'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className='object-contain w-full h-full'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className='text-2xl font-bold text-dark text-shadow-2xs mb-6'>
            {name}
          </h1>
          <div className='grid gap-4'>
            {Object.entries(details)
              .filter(([key, value]) => key !== 'description' && value != null)
              .map(([key, value]) => (
                <div
                  key={key}
                  className='grid grid-cols-[minmax(160px,210px)_1fr] text-base md:text-lg gap-2 items-start'
                >
                  <span className='font-semibold capitalize text-dark'>
                    {key
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                    {'  '}-
                  </span>
                  <span className='text-gray-700'>{value}</span>
                </div>
              ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className='block text-center w-full mt-6 py-3 font-medium text-white rounded bg-black'
          >
            Send Enquiry
          </button>
        </div>
      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={name}
        productSlug={slug}
      />

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
