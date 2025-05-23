import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    title: 'Competitive Pricing & International Standards',
    text: 'As an importer, pricing is crucial for me, and Gigabull offers high-quality leather at competitive rates. Their products meet global standards, making them an ideal choice for international buyers. Looking forward to a long-term business relationship!',
  },
  {
    title: 'Exceptional Quality & Service',
    text: "I have been delighted with the quality of Gigabull's products. The craftsmanship is top-notch and the service exceeds my expectations. Truly a premium experience!",
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute',
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative',
    transition: {
      x: { type: 'spring', stiffness: 200, damping: 25 },
      opacity: { duration: 0.3 },
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute',
    transition: {
      x: { type: 'spring', stiffness: 200, damping: 25 },
      opacity: { duration: 0.3 },
    },
  }),
};

const HomeCustomerReviews = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    const newPage = (page + newDirection + reviews.length) % reviews.length;
    setPage([newPage, newDirection]);
  };

  const review = reviews[page];

  return (
    <div className='bg-gradient-to-b from-stone-700 to-zinc-300 '>
      <div className='container mx-auto px-4 py-20'>
        <div className='flex flex-col items-center justify-center'>
          {/* Heading */}
          <div className='text-center text-white mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
              What Our Customer Says
            </h1>
            <p className='text-lg md:text-xl font-medium text-white/80'>
              Hear From Our Satisfied Customers! Discover Genuine Reviews About
              Our Premium Leather Products, Quality <br />
              Craftsmanship, And Exceptional Service. Your Trust Is Our
              Priority.
            </p>
          </div>

          {/* Review Carousel */}
          <div className='flex items-center justify-center space-x-2 sm:space-x-6 relative'>
            <button
              onClick={() => paginate(-1)}
              className='bg-secondary p-3 rounded-full flex items-center justify-center z-10'
            >
              <ChevronLeft className='text-dark' size={24} />
            </button>

            <div className='relative max-w-xl md:h-[240px] overflow-hidden'>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  className='absolute bg-primary top-0 left-0 w-full h-full text-black p-6 rounded-2xl shadow-xl flex flex-col justify-center'
                >
                  <h2 className='card-header'>{review.title}</h2>{' '}
                  <p className='text-base font-normal text-black'>
                    {review.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={() => paginate(1)}
              className='bg-secondary p-3 rounded-full flex items-center justify-center z-10'
            >
              <ChevronRight className='text-dark' size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCustomerReviews;
