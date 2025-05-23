import React from 'react';
import { ChevronRight } from 'lucide-react';
import {
  AccessoriesCategoryImg,
  MensCategoryImg,
  WomensCategoryImg,
} from '../../assets/home';
import { Link } from 'react-router-dom';

const HomeCategories = () => {
  return (
    <div className='bg-ivory'>
      <div className='container py-16'>
        {/* Section Header */}
        <div className='text-center pb-8'>
          <h1 className='heading-1'>Our Categories</h1>
          <p className='text-body'>
            Luxury Meets Craftsmanship – Experience Genuine Leather Like Never
            Before!
          </p>
        </div>

        {/* Category Cards */}
        <div className='flex flex-col md:flex-row items-stretch justify-center gap-10 px-4 md:px-8'>
          {/* Card Component */}
          {[
            {
              src: MensCategoryImg,
              alt: "Men's Collections",
              label: "Men's Collections",
              desc: 'Premium Leather Bags, Belts, And Wallets For Style And Durability.',
              link: '/mens-collection',
            },
            {
              src: WomensCategoryImg,
              alt: "Women's Collections",
              label: "Women's Collections",
              desc: 'Elegant Leather Bags, Belts, And Wallets For Timeless Style.',
              link: '/womens-collection',
            },
            {
              src: AccessoriesCategoryImg,
              alt: 'Accessories',
              label: 'Accessories',
              desc: 'Stylish Leather Wallets, Keychains, And More For A Refined Touch.',
              link: '/accessories',
            },
          ].map(({ src, alt, label, desc }, idx) => (
            <div
              key={idx}
              className='relative w-full md:w-1/3 max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg bg-white'
            >
              {/* Image with Badge */}
              <div className='relative'>
                <img
                  src={src}
                  alt={alt}
                  className='w-full h-auto object-cover rounded-t-2xl'
                />
                {/* Badge */}
                <div className='absolute top-1/2 right-4 translate-y-[250%] rotate-90 origin-right bg-primary text-dark px-4 py-1 rounded-b-2xl shadow-md text-sm md:text-base font-semibold whitespace-nowrap'>
                  {label}
                </div>
              </div>

              {/* Card Content */}
              <div className='p-4'>
                <p className='text-center text-lg font-semibold mb-4'>{desc}</p>
                <div className='flex justify-center'>
                  <Link
                    to={
                      label === "Men's Collections"
                        ? '/mens-collection'
                        : label === "Women's Collections"
                        ? '/womens-collection'
                        : '/accessories'
                    }
                    className='flex items-center font-bold text-[#3D2E00] hover:underline'
                  >
                    View Collection <ChevronRight className='ml-2' />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
