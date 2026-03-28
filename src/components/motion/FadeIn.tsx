'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

type Props = HTMLMotionProps<'div'> & { children: ReactNode };

export function FadeIn({ children, ...props }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', damping: 28, stiffness: 180 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
