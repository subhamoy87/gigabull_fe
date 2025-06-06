import React from 'react';
import { MensCategoryImg, ParallaxImg } from '../../assets/home';

const ParallaxShowcase = () => {
  return (
    <div>
      {/* First Slide */}
      <ParallaxSlide
        background={
          'https://images.pexels.com/photos/11676702/pexels-photo-11676702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        heading='Get Better Discounts'
        subheading='Handcrafted Excellence in every detail'
      />

      {/* Second Slide */}
      <ParallaxSlide
        background={
          'https://images.pexels.com/photos/6649424/pexels-photo-6649424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        heading="Exclusive Men's Collection"
        subheading='Engineered for timeless appeal'
      />
      <ParallaxSlide
        background={
          'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        heading="Exclusive Men's Collection"
        subheading='Engineered for timeless appeal'
      />
      <ParallaxSlide
        background={
          'https://images.pexels.com/photos/7952556/pexels-photo-7952556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        heading="Exclusive Men's Collection"
        subheading='Engineered for timeless appeal'
      />
    </div>
  );
};

const ParallaxSlide = ({ background, heading, subheading }) => {
  return (
    <div className='relative w-full h-screen overflow-hidden'>
      {/* Parallax Background */}
      <div
        className='absolute inset-0 w-full h-full bg-cover bg-center bg-fixed'
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/10 flex items-end justify-start p-8 md:p-16 z-10'>
        <div className='text-white'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4 animate-fade-in'>
            {heading}
          </h1>
          <h2 className='text-xl md:text-2xl mb-6 animate-fade-in'>
            {subheading}
          </h2>
          <div className='flex gap-4'>
            <button className='bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-200 transition'>
              Shop Now
            </button>
            <button className='border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-black transition'>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxShowcase;
