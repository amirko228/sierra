'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';

export function ContactCta() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-sierra-forest via-sierra-moss to-sierra-deep" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-sierra-sage/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-sierra-honey/15 blur-3xl"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative text-sierra-snow">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sierra-snow/70">
              Связь
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Ответим в Telegram после заявки
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-sierra-snow/78">
              Бронь, вопросы по меню или коворкингу — оставьте контакт на сайте.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-sierra-snow px-8 py-3.5 text-sm font-medium text-sierra-deep shadow-lift transition-colors hover:bg-sierra-oat"
            >
              Написать нам
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
