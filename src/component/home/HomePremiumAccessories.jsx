import React from 'react';
import { PremiumSectionBannerLGImg } from '../../assets/home/index';

const HomePremiumAccessories = () => {
  return (
    <section className='relative bg-white pt-20 sm:pb-40 overflow-hidden'>
      {/* Centered Text */}
      <div className='relative z-10 max-w-3xl mx-auto sm:mb-44 text-center px-4'>
        <h2 className='text-3xl md:text-4xl font-heading font-bold mb-4'>
          Premium Leather Accessories
        </h2>
        <p className='text-gray-700 mb-6'>
          Luxury Meets Craftsmanship – Experience Genuine Leather Like Never
          Before!
        </p>
        <p className='text-gray-800'>
          Experience The Elegance Of <strong>Luxury Leather</strong> With
          GIGABULL’s Expertly Crafted Products. Each Piece Is Designed With
          Precision, Durability, And Style In Mind. Discover Our Collection And
          Elevate Your Everyday Essentials.
        </p>
      </div>

      {/* Combined Illustration */}
      <img
        src={PremiumSectionBannerLGImg}
        alt='Premium leather accessories showcase'
        className='absolute hidden sm:block bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen object-cover pointer-events-none'
      />
    </section>
  );
};

export default HomePremiumAccessories;
