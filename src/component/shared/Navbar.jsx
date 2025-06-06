import {
  Facebook,
  Instagram,
  Youtube,
  Menu,
  X,
  Mail,
  Phone,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logoWithTextImg } from '../../assets/shared';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', to: '/' },
    { name: "Men's Collections", to: 'mens-collection' },
    { name: "Women's Collections", to: 'womens-collection' },
    { name: 'Accessories', to: 'accessories' },
    { name: 'About Us', to: 'about' },
    { name: 'FAQs', to: 'faq' },
    { name: 'Contact Us', to: 'contact' },
    {
      name: 'Certificate',
      to: 'certificate',
    },
    {
      name: 'Brochure',
      to: 'brochure',
    },
  ];

  return (
    <header className='w-full sticky top-0 z-50'>
      <motion.div
        className={`bg-[#202020] text-primary py-1 px-4 transition-all duration-300 ${
          isScrolled ? 'py-3 md:py-2' : 'py-3 md:py-2'
        }`}
      >
        <div className='container mx-auto flex justify-between items-center'>
          <div className='hidden md:flex items-center space-x-4'>
            <a
              href='https://www.facebook.com/gigabullindia'
              target='_blank'
              className='p-1.5 bg-primary rounded-md'
            >
              <Facebook className='size-5  bg-primary text-black cursor-pointer transition-colors' />
            </a>
            <a
              href='https://www.instagram.com/gigabullindia'
              target='_blank'
              className='p-1.5 bg-primary rounded-md'
            >
              <Instagram className='size-5 bg-primary text-black cursor-pointer transition-colors' />
            </a>
            <a
              href='https://www.youtube.com/@gigabullindia'
              target='_blank'
              className='p-1.5 bg-primary rounded-md'
            >
              <Youtube className='size-5  bg-primary text-black cursor-pointer transition-colors' />
            </a>
          </div>

          <motion.div className='flex items-center space-x-2 mx-auto md:mx-0'>
            <Link to='/' className='inline'>
              <img
                src={logoWithTextImg}
                alt='GIGABULL'
                className='md:w-34 w-40 ml-0 lg:ml-36'
              />
            </Link>
          </motion.div>

          <div className='flex items-center space-x-4'>
            <div className='hidden md:flex items-center space-x-4'>
              <a
                href='mailto:admin@gigabull.in'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-1'
              >
                <Mail className='size-6 fill-primary text-black' />
                <span className='text-base text-white'>admin@gigabull.in</span>
              </a>
              <a
                href='tel:+919874525414'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center space-x-1'
              >
                <Phone className='size-6 fill-primary text-black' />
                <span className='text-base text-white'>+919874525414</span>
              </a>
            </div>

            <motion.button
              className='md:hidden'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className='md:hidden bg-white overflow-hidden mt-3 rounded-md'
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className='flex flex-col divide-y divide-gray-200'>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='cursor-pointer'
                    transition={{
                      duration: 0.3,
                      delay: 0.1 + index * 0.05,
                      type: 'spring',
                      stiffness: 100,
                    }}
                  >
                    {item.to.startsWith('http') ? (
                      <a
                        href={item.to}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block px-4 py-3 hover:bg-gray-100 hover:text-yellow-500 transition-colors duration-200 uppercase tracking-wider text-sm text-black'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        className='block px-4 py-3 hover:bg-gray-100 hover:text-yellow-500 transition-colors duration-200 uppercase tracking-wider text-sm text-black'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Desktop Nav */}
      <motion.nav className='hidden md:block bg-white py-2 px-8 lg:px-16 shadow-md'>
        <div className='max-w-7xl mx-auto'>
          <ul className='flex justify-center space-x-4 lg:space-x-6 xl:space-x-8 text-black font-medium'>
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                className='cursor-pointer'
              >
                {item.to.startsWith('http') ? (
                  <a
                    href={item.to}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-primary font-[500] transition-colors duration-200 text-xs  uppercase tracking-wider px-1 py-1'
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.to}
                    className='hover:text-primary font-[500] transition-colors duration-200 text-xs  uppercase tracking-wider px-1 py-1'
                  >
                    {item.name}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </header>
  );
}
