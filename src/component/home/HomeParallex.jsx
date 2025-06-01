import React from 'react';
import { ParallaxImg } from '../../assets/home';

const HomeParallex = () => {
  return (
    <div className='relative w-full h-[400px] overflow-hidden'>
      {/* Parallax Background */}
      <div
        className='absolute inset-0 w-full h-full bg-cover bg-center bg-fixed'
        style={{
          backgroundImage: `url(${ParallaxImg})`,
        }}
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/60 flex items-center justify-center z-10'>
        <div className='text-center font-extrabold text-white px-4'>
          <h1 className='heading-1 font-bold animate-fade-in mb-4'>
            Get Better Discounts
          </h1>
          <h2 className='heading-1 animate-fade-in'>
            Handcrafted Excellence in every detail
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HomeParallex;
