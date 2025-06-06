import { Plus } from 'lucide-react';
import { faqBannerImg } from '../assets/shared';
import FAQAccordion from '../component/about/FAQAccordion';

export default function FAQPage() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <div
        className='relative h-64 bg-cover bg-center'
        style={{
          backgroundImage: `url(${faqBannerImg})`,
        }}
      >
        <div className='absolute inset-0 bg-black/40'></div>
        <div className='relative flex-center h-full'>
          <h1 className='text-4xl font-bold font-heading text-white'>
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      {/* Facts & Questions Section */}
      <div className='container py-16'>
        <div className='max-w-4xl mx-auto'>
          {/* <h2 className='text-4xl font-heading font-bold text-center mb-4 text-dark'>
            Facts & Questions
          </h2> */}
          <p className='text-center text-text mb-1 max-w-2xl mx-auto'>
            Rendered Her For Put Improved Concerns His. Ladies Bed Wisdom Theirs
            Mrs Men Months Set.
          </p>
          <p className='text-center text-text mb-12 max-w-2xl mx-auto'>
            Everything So Dispatched As It Increasing Pianoforte.
          </p>

          {/* FAQ Items */}
          <div className='space-y-4'>
            <FAQAccordion />
            {/* <div className='bg-gray-100 rounded-lg p-6 flex justify-between items-center hover:bg-gray-200 transition-colors cursor-pointer'>
              <span className='font-semibold text-dark'>Who is GIGABULL? </span>
              <Plus className='w-6 h-6 text-dark' />
            </div>

            <div className='bg-gray-100 rounded-lg p-6 flex justify-between items-center hover:bg-gray-200 transition-colors cursor-pointer'>
              <span className='font-semibold text-dark'>
                What are all the leather products GIGABULL offer?{' '}
              </span>
              <Plus className='w-6 h-6 text-dark' />
            </div>

            <div className='bg-gray-100 rounded-lg p-6 flex justify-between items-center hover:bg-gray-200 transition-colors cursor-pointer'>
              <span className='font-semibold text-dark'>
                Are all GIGABULL products made from genuine leather?{' '}
              </span>
              <Plus className='w-6 h-6 text-dark' />
            </div>

            <div className='bg-gray-100 rounded-lg p-6 flex justify-between items-center hover:bg-gray-200 transition-colors cursor-pointer'>
              <span className='font-semibold text-dark'>
                What makes GIGABULL products unique?{' '}
              </span>
              <Plus className='w-6 h-6 text-dark' />
            </div>
            <div className='bg-gray-100 rounded-lg p-6 flex justify-between items-center hover:bg-gray-200 transition-colors cursor-pointer'>
              <span className='font-semibold text-dark'>
                How do I place an order?{' '}
              </span>
              <Plus className='w-6 h-6 text-dark' />
            </div>
            <div className='bg-gray-100 rounded-lg p-6 flex justify-between items-center hover:bg-gray-200 transition-colors cursor-pointer'>
              <span className='font-semibold text-dark'>
                Do you offer wholesale options?{' '}
              </span>
              <Plus className='w-6 h-6 text-dark' />
            </div>
            <div className='bg-gray-100 rounded-lg p-6 flex justify-between items-center hover:bg-gray-200 transition-colors cursor-pointer'>
              <span className='font-semibold text-dark'>
                Do you provide international shipping?{' '}
              </span>
              <Plus className='w-6 h-6 text-dark' />
            </div>
            <div className='bg-gray-100 rounded-lg p-6 flex justify-between items-center hover:bg-gray-200 transition-colors cursor-pointer'>
              <span className='font-semibold text-dark'>
                How can I get in touch with customer support?{' '}
              </span>
              <Plus className='w-6 h-6 text-dark' />
            </div>
            <div className='bg-gray-100 rounded-lg p-6 flex justify-between items-center hover:bg-gray-200 transition-colors cursor-pointer'>
              <span className='font-semibold text-dark'>
                Do you offer custom leather products?{' '}
              </span>
              <Plus className='w-6 h-6 text-dark' />
            </div> */}
          </div>
        </div>
      </div>

      {/* Map Footer */}
      <div className='h-96'>
        <iframe
          src='https://maps.google.com/maps?q=Gigabull%2C%20Metropolitan%20CZ20B%20CO-OPT%20Housing%20Society%20Ltd%2C%20Canal%20S%20Rd%2C%20Kolkata%2C%20West%20Bengal%20700105&t=m&z=15&output=embed&iwloc=near'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          aria-label='Gigabull Location Map'
          title='Gigabull Location'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </div>
  );
}
