'use client';

import { motion } from 'framer-motion';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 max-w-2xl"
    >
      {eyebrow && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sierra-clay">
            {eyebrow}
          </p>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 block h-px origin-left bg-gradient-to-r from-sierra-clay to-sierra-honey"
          />
        </div>
      )}
      <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-sierra-deep sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-sierra-ink/72">{subtitle}</p>
      )}
    </motion.div>
  );
}
