import React from 'react';
import {
  Products01Img,
  Products02Img,
  Products03Img,
  Products04Img,
  Products05Img,
  Products06Img,
  Products07Img,
  Products08Img,
} from '../../assets/home';

export default function HomeProductsShowcase() {
  return (
    <>
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center pb-8'>
          <h1 className='heading-1'>Our Products</h1>
        </div>

        <p className='text-center text-body max-w-4xl mx-auto mb-16'>
          Experience The Elegance Of{' '}
          <span className='font-semibold'>Luxury Leather</span> With GIGABULL's
          Expertly Crafted Products. Each Piece Is Designed With Precision,
          Durability, And Style In Mind. Discover Our Collection And Elevate
          Your Everyday Essentials.
        </p>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-20 gap-x-0 sm:gap-x-8 mt-20'>
          {[
            {
              img: Products07Img,
              title: "Women's Leather Wallet",
              desc: 'Genuine Leather Wallet for <br /> Women',
            },
            {
              img: Products08Img,
              title: 'RFID Leather Wallet',
              desc: 'Premium blend of elegance and <br /> durability',
            },
            {
              img: Products01Img,
              title: 'Genuine Laptop Bag',
              desc: 'GIGABULL Brown Genuine <br /> Bag',
            },
            {
              img: Products02Img,
              title: 'Handcrafted Wallet',
              desc: 'Vintage 3D Print Leather <br /> Wallet',
            },
            {
              img: Products03Img,
              title: 'Genuine Luggage Bag',
              desc: 'GIGABULL Pure Leather <br /> High-Quality Bag',
            },
            {
              img: Products04Img,
              title: "Men's Leather Bag",
              desc: 'Perfect blend of style. High-quality <br /> leather',
            },
            {
              img: Products05Img,
              title: "Women's Leather Handbag",
              desc: 'Handcrafted Genuine Leather <br /> Handbag',
            },
            {
              img: Products06Img,
              title: "Women's Leather Wallet",
              desc: 'Handcrafted Leather Wallet for <br /> Women',
            },
          ].map((product, index) => (
            <div key={index} className='relative bg-ivory mx-4'>
              <div className='ring rounded-lg overflow-visible relative'>
                <div className='ring-2 ring-primary -translate-y-10 hover:-translate-y-14 transition-all duration-300 cursor-pointer rounded-lg overflow-hidden mx-3 sm:mx-5'>
                  <div className='aspect-square bg-white p-4 flex items-center justify-center'>
                    <img
                      src={product.img}
                      alt={product.title}
                      width={200}
                      height={200}
                      className='object-contain max-h-48'
                    />
                  </div>
                </div>
                <div className='pb-4 -mt-6 text-center'>
                  <h3 className='sm:text-xl text-base font-bold mb-2'>{product.title}</h3>
                  <p
                    className='text-gray-700 sm:text-base text-xs mx-[2px] sm:mx-0'
                    dangerouslySetInnerHTML={{ __html: product.desc }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
