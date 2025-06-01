import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CategoryAccessoriesCollectionImg } from '../../assets/category';
import productsData from '../../data/Products.js';
import { Link } from 'react-router-dom';

const AccessoriesCollection = () => {
  const accessoriesProducts =
    productsData.find((cat) => cat.category === 'Accessories')?.products || [];

  const productsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(accessoriesProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = accessoriesProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='w-full bg-white font-sans'>
      {/* Hero Banner */}
      <div className='relative w-full h-[260px] overflow-hidden '>
        <img
          src={CategoryAccessoriesCollectionImg}
          alt='Leather wallets collection'
          className='object-cover w-full h-full'
        />
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <h1 className='text-4xl font-heading font-bold text-white tracking-wider'>
            Accessories
          </h1>
        </div>
      </div>

      {/* Products Grid */}
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {currentProducts.map((product, idx) => (
            <Link to={`/product/${product.slug}`} key={idx} className='aspect-square'>
              <div className='flex flex-col'>
                <div className='bg-white rounded-lg overflow-hidden shadow-md'>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className='object-cover aspect-square h-full w-full'
                  />
                </div>
                <div className='text-center mt-2'>
                  <p className='text-sm text-gray-500'>Accessories</p>
                  <h3 className='font-medium text-dark'>{product.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className='flex justify-center mt-12'>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='flex items-center justify-center w-8 h-8 text-dark border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50'
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`flex items-center justify-center w-8 h-8 border rounded ${
                    currentPage === i + 1
                      ? 'bg-primary text-dark font-bold'
                      : 'text-dark border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='flex items-center justify-center w-8 h-8 text-dark border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50'
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessoriesCollection;
