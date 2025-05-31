'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn as ny } from '../../lib/utils';

export function GradualSpacing({
  text = ['Confidence', 'Timeless Style'],
  duration = 0.2,
  delayMultiple = 0.02,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentText = text[currentIndex];

  useEffect(() => {
    const totalDelay = currentText.length * delayMultiple + duration + 1;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % text.length);
    }, totalDelay * 1000);
    return () => clearTimeout(timer);
  }, [currentIndex, currentText, delayMultiple, duration, text.length]);

  return (
    <div className='flex'>
      <AnimatePresence mode='wait'>
        <div key={currentIndex} className='flex'>
          {currentText.split('').map((char, i) => (
            <motion.h1
              key={i}
              initial='hidden'
              animate='visible'
              exit='hidden'
              variants={framerProps}
              transition={{ duration, delay: i * delayMultiple }}
              className={ny('drop-shadow-sm', className)}
            >
              {char === ' ' ? <span>&nbsp;</span> : char}
            </motion.h1>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
