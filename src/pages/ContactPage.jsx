import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { ContactImg } from '../assets/contact';
import { Link } from 'react-router-dom';
import ContactForm from '../component/contact/ContactForm';

const ContactPage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className='w-full font-sans bg-white text-[#333333]'>
      {/* Hero Section */}
      <div className='relative w-full h-64 bg-[#1e293b] overflow-hidden before:absolute before:inset-0 before:bg-black/50 before:content-[""]'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: `url(${ContactImg})`,
            opacity: 0.7,
          }}
        ></div>
        <div className='relative container mx-auto px-4 h-full flex items-center'>
          <h1 className='text-4xl font-bold text-white font-heading'>
            Contact Us
          </h1>
        </div>
      </div>

      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row w-full px-4 sm:px-8 lg:px-16 mt-16 lg:mt-24 gap-10'>
          {/* Map */}
          <div className='w-full lg:w-1/2 h-auto relative'>
            {loading && (
              <div className='absolute inset-0 bg-gray-300 rounded-md animate-pulse flex items-center justify-center z-10'>
                <div className='w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
              </div>
            )}
            <iframe
              src='https://maps.google.com/maps?q=Gigabull%2C%20Metropolitan%20CZ20B%20CO-OPT%20Housing%20Society%20Ltd%2C%20Canal%20S%20Rd%2C%20Kolkata%2C%20West%20Bengal%20700105&t=m&z=15&output=embed&iwloc=near'
              width='100%'
              height='450'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              aria-label='Gigabull Location Map'
              title='Gigabull Location'
              className='rounded-md w-full'
              onLoad={() => setLoading(false)}
            ></iframe>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>

        {/* Payment CTA */}
        <div className='w-full px-4 sm:px-8 lg:px-16 my-20 flex flex-col lg:flex-row justify-between items-start gap-8'>
          <div className='max-w-3xl'>
            <h2 className='text-2xl sm:text-3xl font-heading font-semibold text-[#1e293b] mb-4'>
              Make a Secure Payment
            </h2>
            <p className='text-[#333333] mb-2'>
              By clicking the button, you will be redirected to Razorpay’s
              secure payment gateway. Gigabull ensures a safe and hassle-free
              transaction experience.
            </p>
          </div>
          <div>
            <a
              className='flex items-center space-x-2 bg-black text-white font-semibold py-3 px-5 rounded hover:bg-[#333] text-lg'
              target='_blank'
              rel='noopener noreferrer'
              href='https://razorpay.me/@gigabull'
            >
              <CreditCard size={18} />
              <span>Pay Here</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
