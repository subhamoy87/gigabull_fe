import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { logoWithTextImg } from '../../assets/shared';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-[#202020] text-white'>
      <div className='container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10'>
        {/* Brand + CTA */}
        <div className='space-y-6'>
          <div className='flex items-center gap-2'>
            <img src={logoWithTextImg} alt='Gigabull Logo' />
          </div>
          <p className='text-white'>
            Any Question? Please let us know, we will assist you.
          </p>
          <Link
            to='/contact'
            className='inline-block bg-white text-gray-900 font-semibold text-xl px-5 py-3 rounded-xl hover:bg-gray-100 transition'
          >
            Send Enquiry&nbsp;&raquo;
          </Link>
        </div>

        {/* Categories */}
        <div className='space-y-4'>
          <h3 className='text-yellow-400 font-semibold text-xl'>Categories</h3>
          <ul className='space-y-2 text-white'>
            <li>
              <Link
                to='/mens-collection'
                className='hover:text-white transition'
              >
                Men’s Collection
              </Link>
            </li>
            <li>
              <Link
                to='/womens-collection'
                className='hover:text-white transition'
              >
                Women’s Collection
              </Link>
            </li>
            <li>
              <Link to='/accessories' className='hover:text-white transition'>
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick as */}
        <div className='space-y-4'>
          <h3 className='text-yellow-400 font-semibold text-xl'>Quick as</h3>
          <ul className='space-y-2 text-white'>
            <li>
              <Link to='/terms' className='hover:text-white transition'>
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to='/privacy' className='hover:text-white transition'>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to='/return' className='hover:text-white transition'>
                Return and Exchange Policy
              </Link>
            </li>
            <li>
              <Link to='/shipping' className='hover:text-white transition'>
                Shipping & Delivery
              </Link>
            </li>
          </ul>
        </div>

        {/* Reach Us */}
        <div className='space-y-4 border-4 border-primary p-6 rounded'>
          <h3 className='text-yellow-400 font-semibold text-xl'>Reach Us</h3>
          <div className='space-y-3 text-white'>
            <div className='flex items-start gap-3'>
              <MapPin
                size={20}
                className='flex-shrink-0 text-yellow-400 mt-1'
              />
              <p>
                Metropolitan CZ-20B Co-Operative Housing Society Ltd.
                <br />
                Canal South Road, Kolkata-700105
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <Phone size={20} className='text-yellow-400 flex-shrink-0' />
              <a
                href='tel:+919874525414'
                className='hover:text-white transition'
              >
                +91-98745-25414
              </a>
            </div>
            <div className='flex items-center gap-3'>
              <Mail size={20} className='text-yellow-400 flex-shrink-0' />
              <a
                href='mailto:admin@gigabull.in'
                className='hover:text-white transition'
              >
                admin@gigabull.in
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
