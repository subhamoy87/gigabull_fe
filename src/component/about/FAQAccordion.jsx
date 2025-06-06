import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';

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
          <div>
            <div
              key={idx}
              onClick={() => toggle(idx)}
              className='bg-gray-100 rounded-lg p-4 md:p-6 flex justify-between items-center hover:bg-gray-200 transition-colors cursor-pointer'
            >
              <span className='font-semibold md:text-xl text-dark'>{item.question}</span>

              {isOpen ? (
                <ChevronUp className='w-6 h-6 text-dark' />
              ) : (
                <ChevronDown className='w-6 h-6 text-dark' />
              )}
            </div>
            <div className='ring ring-black/50 rounded'>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className='text-text md:text-lg text-base mt-4 p-2 bg-gray-100/50 rounded-lg'
                  >
                    {item.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FAQAccordion;
// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown, ChevronUp } from 'lucide-react';

// const faqItems = [
//   {
//     question: 'Who is GIGABULL?',
//     answer:
//       'GIGABULL is a brand dedicated to crafting high-quality genuine leather products with exceptional craftsmanship and durability.',
//   },
//   {
//     question: 'What are all the leather products GIGABULL offer?',
//     answer:
//       'We offer a variety of genuine leather products, including wallets, clutches, laptop bags, and ladies’ bags.',
//   },
//   {
//     question: 'Are all GIGABULL products made from genuine leather?',
//     answer:
//       'Yes, we use only genuine leather to ensure a luxurious feel, durability, and timeless elegance.',
//   },
//   {
//     question: 'What makes GIGABULL products unique?',
//     answer:
//       'Our products stand out due to high stitching quality, premium leather, pocket-friendly pricing, and a dedicated team committed to excellence.',
//   },
//   {
//     question: 'How do I place an order?',
//     answer:
//       'You can place an order by sending us an inquiry through our contact form or reaching out via email or phone.',
//   },
//   {
//     question: 'Do you offer wholesale options?',
//     answer:
//       'Yes, we provide wholesale opportunities. Contact us to discuss bulk orders and pricing.',
//   },
//   {
//     question: 'Do you provide international shipping?',
//     answer:
//       'Please contact us to inquire about international shipping options and availability.',
//   },
//   {
//     question: 'How can I get in touch with customer support?',
//     answer:
//       'You can reach us at +91 9874525414 or email us at admin@gigabull.in for any inquiries.',
//   },
//   {
//     question: 'Do you offer custom leather products?',
//     answer:
//       'We may be able to accommodate custom requests. Please contact us with your requirements for more details.',
//   },
// ];

// function FAQAccordion() {
//   const [openIndex, setOpenIndex] = useState(0); // First item open by default

//   const toggle = (idx) => {
//     setOpenIndex(openIndex === idx ? null : idx);
//   };

//   return (
//     <div className='mt-8 space-y-4'>
//       {faqItems.map((item, idx) => {
//         const isOpen = idx === openIndex;
//         return (
//           <div
//             key={idx}
//             className='border border-gray-200 rounded-md overflow-hidden'
//           >
//             <div
//               onClick={() => toggle(idx)}
//               className='flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50 transition'
//             >
//               <h3 className='font-semibold text-dark'>{item.question}</h3>
//               {isOpen ? (
//                 <ChevronUp className='text-dark' size={20} />
//               ) : (
//                 <ChevronDown className='text-dark' size={20} />
//               )}
//             </div>
//             <AnimatePresence>
//               {isOpen && (
//                 <motion.div
//                   key='content'
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className='px-4 pb-4 text-body overflow-hidden bg-white'
//                 >
//                   {item.answer}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default FAQAccordion;
