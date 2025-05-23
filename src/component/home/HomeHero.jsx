import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  BadgeImg,
  HeroCarousel1,
  HeroCarousel2,
  HeroCarousel3,
  HeroCarousel4,
  HeroCarousel5,
} from '../../assets/home';
import { Link } from 'react-router-dom';

const images = [
  HeroCarousel1,
  HeroCarousel2,
  HeroCarousel3,
  HeroCarousel4,
  HeroCarousel5,
];

const zoomVariants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: 1.1,
    opacity: 1,
    transition: { duration: 5, ease: 'easeInOut' },
  },
  exit: {
    scale: 1.2,
    opacity: 0.5,
    transition: { duration: 1, ease: 'easeInOut' },
  },
};

const HomeHero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full overflow-visible'>
      <section className='relative w-full h-[400px] overflow-visible bg-black'>
        {/* Background Carousel */}
        <div className='absolute inset-0 w-full h-full overflow-hidden'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={index}
              variants={zoomVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              className='absolute inset-0 w-full h-full'
            >
              <img
                src={images[index]}
                alt={`Luxury leather bag ${index + 1}`}
                className='w-full h-full object-cover object-center'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-black/80 to-transparent'></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className='container relative h-full flex items-center z-10 overflow-visible'>
          <div className='max-w-xl'>
            <h1 className='text-white text-5xl md:text-6xl font-heading font-bold mb-1'>
              Luxury Leather
            </h1>
            <h2 className='text-primary text-4xl md:text-5xl font-heading font-bold mb-2'>
              Confidence
            </h2>
            <h3 className='text-white text-4xl md:text-5xl font-heading font-bold mb-3'>
              Crafted for the Modern You
            </h3>
            <p className='text-white/90 text-lg mb-8'>
              Luxury Meets Craftsmanship - Experience Genuine Leather Like Never
              Before!
            </p>
            <Link
              to='/mens-collection'
              className='btn-primary flex items-center gap-2 w-fit'
            >
              Explore Collection <ArrowRight size={18} />
            </Link>
          </div>

          {/* Satisfaction Badge */}
          <motion.div
            className='absolute -bottom-20 right-6 md:-bottom-18 md:right-10 w-24 h-24 md:w-36 md:h-36 z-20'
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 8,
            }}
          >
            <div className='relative w-full h-full'>
              <motion.img
                src={BadgeImg}
                alt='100% Customer Satisfaction Guaranteed'
                className='w-full h-full object-contain'
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
