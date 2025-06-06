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
    <div className='bg-gradient-to-b from-stone-600 to-zinc-200'>
      <div className='container mx-auto px-4 py-16 sm:py-20'>
        <div className='flex flex-col items-center justify-center'>
          {/* Heading */}
          <div className='text-center text-white mb-10 sm:mb-12'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4'>
              What Our Customer Says
            </h1>
            <p className='text-sm sm:text-base md:text-lg font-medium text-white/80 leading-relaxed sm:leading-snug'>
              Hear From Our Satisfied Customers! Discover Genuine Reviews About
              Our Premium Leather Products, Quality{' '}
              <br className='hidden sm:block' />
              Craftsmanship, And Exceptional Service. Your Trust Is Our
              Priority.
            </p>
          </div>

          {/* Review Carousel */}
          <div className='flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-6 relative w-full'>
            {/* Previous Button */}
            <button
              onClick={() => paginate(-1)}
              className='ring p-2 sm:p-3 cursor-pointer bg-primary rounded-full flex items-center justify-center z-10'
            >
              <ChevronLeft className='text-dark' size={20} sm={{ size: 24 }} />
            </button>

            {/* Carousel Content */}
            <div
              className='
              relative 
              w-full 
              max-w-xs 
              sm:max-w-sm 
              md:max-w-md 
              lg:max-w-xl 
              h-auto 
              sm:h-56 
              md:h-64 
              lg:h-72 
              overflow-hidden
            '
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  className='absolute top-0 left-0 w-full h-full shadow-3xl bg-primary p-4 sm:p-6 md:p-8 rounded-3xl flex flex-col justify-center'
                >
                  <h2 className='text-lg sm:text-xl md:text-2xl font-semibold mb-2'>
                    {review.title}
                  </h2>
                  <p className='text-xs sm:text-sm md:text-base leading-relaxed'>
                    {review.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button
              onClick={() => paginate(1)}
              className='ring p-2 bg-primary cursor-pointer sm:p-3 rounded-full flex items-center justify-center z-10'
            >
              <ChevronRight className='text-dark' size={20} sm={{ size: 24 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCustomerReviews;

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const reviews = [
//   {
//     title: 'Competitive Pricing & International Standards',
//     text: 'As an importer, pricing is crucial for me, and Gigabull offers high-quality leather at competitive rates. Their products meet global standards, making them an ideal choice for international buyers. Looking forward to a long-term business relationship!',
//   },
//   {
//     title: 'Exceptional Quality & Service',
//     text: "I have been delighted with the quality of Gigabull's products. The craftsmanship is top-notch and the service exceeds my expectations. Truly a premium experience!",
//   },
// ];

// const variants = {
//   enter: (direction) => ({
//     x: direction > 0 ? 300 : -300,
//     opacity: 0,
//     position: 'absolute',
//   }),
//   center: {
//     x: 0,
//     opacity: 1,
//     position: 'relative',
//     transition: {
//       x: { type: 'spring', stiffness: 200, damping: 25 },
//       opacity: { duration: 0.3 },
//     },
//   },
//   exit: (direction) => ({
//     x: direction < 0 ? 300 : -300,
//     opacity: 0,
//     position: 'absolute',
//     transition: {
//       x: { type: 'spring', stiffness: 200, damping: 25 },
//       opacity: { duration: 0.3 },
//     },
//   }),
// };

// const HomeCustomerReviews = () => {
//   const [[page, direction], setPage] = useState([0, 0]);

//   const paginate = (newDirection) => {
//     const newPage = (page + newDirection + reviews.length) % reviews.length;
//     setPage([newPage, newDirection]);
//   };

//   const review = reviews[page];

//   return (
//     <div className='bg-gradient-to-b from-stone-600 to-zinc-200'>
//       <div className='container mx-auto px-4 py-16 sm:py-20'>
//         <div className='flex flex-col items-center justify-center'>
//           {/* Heading */}
//           <div className='text-center text-white mb-10 sm:mb-12'>
//             <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4'>
//               What Our Customer Says
//             </h1>
//             <p className='text-sm sm:text-base md:text-lg font-medium text-white/80 leading-relaxed sm:leading-snug'>
//               Hear From Our Satisfied Customers! Discover Genuine Reviews About
//               Our Premium Leather Products, Quality{' '}
//               <br className='hidden sm:block' />
//               Craftsmanship, And Exceptional Service. Your Trust Is Our
//               Priority.
//             </p>
//           </div>

//           {/* Review Carousel */}
//           <div className='flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-6 relative w-full'>
//             {/* Previous Button */}
//             <button
//               onClick={() => paginate(-1)}
//               className='ring p-2 sm:p-3 rounded-full flex items-center justify-center z-10'
//             >
//               <ChevronLeft className='text-dark' size={20} sm={{ size: 24 }} />
//             </button>

//             {/* Carousel Content */}
//             <div
//               className='
//               relative 
//               w-full 
//               max-w-xs 
//               sm:max-w-sm 
//               md:max-w-md 
//               lg:max-w-xl 
//               h-auto 
//               sm:h-56 
//               md:h-64 
//               lg:h-72 
//               overflow-hidden
//             '
//             >
//               <AnimatePresence initial={false} custom={direction}>
//                 <motion.div
//                   key={page}
//                   custom={direction}
//                   variants={variants}
//                   initial='enter'
//                   animate='center'
//                   exit='exit'
//                   className='absolute top-0 left-0 w-full h-full shadow-3xl backdrop-blur-3xl p-4 sm:p-6 md:p-8 rounded-3xl flex flex-col justify-center'
//                 >
//                   <h2 className='text-lg sm:text-xl md:text-2xl font-semibold mb-2'>
//                     {review.title}
//                   </h2>
//                   <p className='text-xs sm:text-sm md:text-base leading-relaxed'>
//                     {review.text}
//                   </p>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Next Button */}
//             <button
//               onClick={() => paginate(1)}
//               className='ring p-2 sm:p-3 rounded-full flex items-center justify-center z-10'
//             >
//               <ChevronRight className='text-dark' size={20} sm={{ size: 24 }} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeCustomerReviews;
