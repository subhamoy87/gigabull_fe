import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';

const Footer = () => {
  const { company, contact } = useSiteData();

  return (
    <footer className='bg-[#1c1c1c] text-white border-t border-white/10'>
      <div className='container mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8'>
        {/* Brand + CTA */}
        <div className='space-y-3.5 col-span-1 md:col-span-1 lg:col-span-3'>
          <div className='flex items-center gap-2'>
            {company.logoUrl ? (
              <img src={company.logoUrl} alt={company.brandName || 'Gigabull Logo'} className='max-h-14 sm:max-h-16 object-contain' />
            ) : (
              <span className='font-bold text-2xl tracking-wider text-yellow-400'>{company.brandName}</span>
            )}
          </div>
          <p className='text-sm text-gray-300 leading-relaxed max-w-xs'>
            Any Question? Please let us know, we will assist you.
          </p>
          <Link
            to='/contact'
            className='inline-flex items-center gap-1.5 bg-yellow-400 text-gray-950 font-bold text-sm px-4 py-2 rounded-lg hover:bg-yellow-300 transition shadow'
          >
            Send Enquiry &raquo;
          </Link>
        </div>

        {/* Categories */}
        <div className='space-y-3 col-span-1 md:col-span-1 lg:col-span-2'>
          <h3 className='text-yellow-400 font-bold text-base uppercase tracking-wider'>Categories</h3>
          <ul className='space-y-2.5 text-sm text-gray-300'>
            <li>
              <Link to='/mens-collection' className='hover:text-yellow-400 transition'>
                Men’s Collection
              </Link>
            </li>
            <li>
              <Link to='/womens-collection' className='hover:text-yellow-400 transition'>
                Women’s Collection
              </Link>
            </li>
            <li>
              <Link to='/accessories' className='hover:text-yellow-400 transition'>
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className='space-y-3 col-span-1 md:col-span-1 lg:col-span-3'>
          <h3 className='text-yellow-400 font-bold text-base uppercase tracking-wider'>Quick Links</h3>
          <ul className='space-y-2.5 text-sm text-gray-300'>
            <li>
              <Link to='/terms' className='hover:text-yellow-400 transition'>
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to='/privacy' className='hover:text-yellow-400 transition'>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to='/return' className='hover:text-yellow-400 transition'>
                Return and Exchange Policy
              </Link>
            </li>
            <li>
              <Link to='/shipping' className='hover:text-yellow-400 transition'>
                Shipping & Delivery
              </Link>
            </li>
          </ul>
        </div>

        {/* Reach Us */}
        <div className='bg-white/5 border border-yellow-400/20 p-5 sm:p-6 rounded-xl space-y-3.5 col-span-1 md:col-span-2 lg:col-span-4'>
          <h3 className='text-yellow-400 font-bold text-base uppercase tracking-wider'>Reach Us</h3>
          <div className='space-y-3 text-sm text-gray-300'>
            <div className='flex items-start gap-3'>
              <MapPin size={18} className='flex-shrink-0 text-yellow-400 mt-0.5' />
              <p className='whitespace-pre-line leading-relaxed'>
                {contact.address || 'Metropolitan CZ-20B Co-Operative Housing Society Ltd. Canal South Road, Kolkata-700105'}
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <Phone size={18} className='text-yellow-400 flex-shrink-0' />
              <a href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`} className='hover:text-yellow-400 transition'>
                {contact.phone || '+91-98745-25414'}
              </a>
            </div>
            <div className='flex items-center gap-3'>
              <Mail size={18} className='text-yellow-400 flex-shrink-0' />
              <a href={`mailto:${contact.email}`} className='hover:text-yellow-400 transition'>
                {contact.email || 'admin@gigabull.in'}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-white/10 py-3.5 text-center text-sm text-white/60'>
        <p>
          Developed By{' '}
          <a href='https://dhigrowth.com' target='_blank' rel='noreferrer' className='hover:text-yellow-400 underline transition'>
            DhiGrowth
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
