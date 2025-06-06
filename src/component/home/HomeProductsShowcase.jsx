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
import { Link } from 'react-router-dom';

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

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-y-20 gap-y-16 gap-x-0 sm:gap-x-8 mt-20'>
          {[
            {
              img: Products07Img,
              title: "Women's Leather <br />  Wallet",
              desc: 'Genuine Leather Wallet for Women',
              link: 'product/handbag-genuine-leather-wallet-for-women-12',
            },
            {
              img: Products08Img,
              title: 'RFID Leather <br /> Wallet',
              desc: 'Premium blend of elegance and durability',
              link: 'product/Bike%20Embossed%20Leather%20Wallet%20TAN-00',
            },
            {
              img: Products01Img,
              title: 'Men’s Genuine Leather<br />  Bag',
              desc: 'GIGABULL Men’s Genuine  Leather Bag',
              link: 'product/brown-men-s-genuine-leather-bag-22',
            },
            {
              img: Products02Img,
              title: 'Handcrafted <br /> Wallet',
              desc: 'GIGABULL Vintage 3D Print Leather  Wallet',
              link: 'product/vintage-brown-rfid-3d-print-leather-wallet-06',
            },
            {
              img: Products03Img,
              title: 'Genuine Luggage <br /> Bag',
              desc: 'GIGABULL Pure Leather <br /> High-Quality <br /> Bag',
              link: 'product/gigabull-pure-leather-backpack-21',
            },
            {
              img: Products04Img,
              title: "Men's Leather <br /> Bag",
              desc: 'Perfect blend of style. <br />  High-quality <br /> leather',
              link: 'product/gigabull-men-s-genuine-leather-bag-20',
            },
            {
              img: Products05Img,
              title: "Women's Leather <br />  Handbag",
              desc: 'Handcrafted Genuine <br />  Leather <br /> Handbag',
              link: 'product/handcrafted-genuine-leather-handbag',
            },
            {
              img: Products06Img,
              title: "Women's Leather <br />  Wallet",
              desc: 'Handcrafted Leather <br />  Wallet for <br /> Women',
              link: 'product/handcrafted-genuine-leather-wallet-for-women',
            },
          ].map((product, index) => (
            <div key={index} className='relative bg-ivory mx-4'>
              <div className='ring rounded-lg overflow-visible relative'>
                <div className='ring-2 ring-primary -translate-y-10 hover:-translate-y-14 transition-all duration-300 cursor-pointer rounded-lg overflow-hidden mx-3 sm:mx-5'>
                  <Link to={`${product.link}`}>
                    <div className='aspect-square bg-white p-4 flex items-center justify-center'>
                      <img
                        src={product.img}
                        alt={product.title}
                        width={200}
                        height={200}
                        className='object-contain max-h-48'
                      />
                    </div>
                  </Link>
                </div>
                <div className='pb-4 -mt-6 text-center'>
                  <h3
                    className='sm:text-xl text-base font-bold mb-2'
                    dangerouslySetInnerHTML={{ __html: product.title }}
                  />

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
