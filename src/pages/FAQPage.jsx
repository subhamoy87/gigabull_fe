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
      <div className='container py-12 md:py-16 mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <p className='text-center text-gray-600 mb-8 max-w-2xl mx-auto text-base md:text-lg'>
            Find answers to commonly asked questions about GIGABULL products, ordering, shipping, and wholesale options below.
          </p>

          {/* FAQ Items */}
          <FAQAccordion />
        </div>
      </div>

      {/* Map Footer */}
      <div className='h-96'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9965.355950193825!2d88.3951078307683!3d22.556971416295514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277edf0421f99%3A0xd336dfd249e9be87!2sGigabull!5e0!3m2!1sen!2sin!4v1749727093097!5m2!1sen!2sin'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          aria-label='Gigabull Location Map'
          title='Gigabull Location'
        ></iframe>
      </div>
    </div>
  );
}
