import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  {
    question: 'Who is GIGABULL?',
    answer:
      'GIGABULL is a brand dedicated to crafting high-quality genuine leather products with exceptional craftsmanship and durability.',
  },
  {
    question: 'What are all the leather products GIGABULL offer?',
    answer:
      'We offer a variety of genuine leather products, including wallets, clutches, laptop bags, and ladies’ bags.',
  },
  {
    question: 'Are all GIGABULL products made from genuine leather?',
    answer:
      'Yes, we use only genuine leather to ensure a luxurious feel, durability, and timeless elegance.',
  },
  {
    question: 'What makes GIGABULL products unique?',
    answer:
      'Our products stand out due to high stitching quality, premium leather, pocket-friendly pricing, and a dedicated team committed to excellence.',
  },
  {
    question: 'How do I place an order?',
    answer:
      'You can place an order by sending us an inquiry through our contact form or reaching out via email or phone.',
  },
  {
    question: 'Do you offer wholesale options?',
    answer:
      'Yes, we provide wholesale opportunities. Contact us to discuss bulk orders and pricing.',
  },
  {
    question: 'Do you provide international shipping?',
    answer:
      'Please contact us to inquire about international shipping options and availability.',
  },
  {
    question: 'How can I get in touch with customer support?',
    answer:
      'You can reach us at +91 9874525414 or email us at admin@gigabull.in for any inquiries.',
  },
  {
    question: 'Do you offer custom leather products?',
    answer:
      'We may be able to accommodate custom requests. Please contact us with your requirements for more details.',
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className='mt-8 space-y-4'>
      {faqItems.map((item, idx) => {
        const isOpen = idx === openIndex;
        return (
          <div
            key={idx}
            className='border border-gray-200 rounded-md overflow-hidden'
          >
            <div
              onClick={() => toggle(idx)}
              className='flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50 transition'
            >
              <h3 className='font-semibold text-dark'>{item.question}</h3>
              {isOpen ? (
                <ChevronUp className='text-dark' size={20} />
              ) : (
                <ChevronDown className='text-dark' size={20} />
              )}
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key='content'
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='px-4 pb-4 text-body overflow-hidden bg-white'
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default FAQAccordion;
