'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { MountainMark } from '@/components/brand/MountainMark';

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yOrbs = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 0.6], [0, 40]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.45], [1, 0.35]);
  const yMountains = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative min-h-[min(92vh,900px)] overflow-hidden sierra-hero-gradient"
    >
      <motion.div
        style={{ opacity: opacityBg }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <motion.div
          style={{ y: yOrbs }}
          className="absolute -right-20 top-10 h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-sierra-sage/25 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-16 top-32 h-72 w-72 rounded-full bg-sierra-honey/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-[15%] h-48 w-48 rounded-full bg-sierra-mist/40 blur-2xl"
        />
      </motion.div>

      {/* горная линия снизу */}
      <motion.div
        style={{ y: yMountains }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 text-sierra-moss/25"
        aria-hidden
      >
        <svg
          className="absolute bottom-0 w-[140%] -translate-x-[12%]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 L0,85 Q150,40 300,70 T600,55 T900,75 T1200,50 L1200,120 Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      <Container className="relative flex min-h-[min(92vh,900px)] flex-col justify-center pb-28 pt-24 sm:pb-32 sm:pt-28">
        <motion.div style={{ y: yText }} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 flex items-center gap-3"
          >
            <MountainMark className="h-11 w-11 shrink-0 opacity-95 drop-shadow-md" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sierra-clay">
              Каракол · Sierra coffee
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease }}
            className="font-display text-4xl font-medium leading-[1.12] tracking-tight text-sierra-deep sm:text-5xl lg:text-[3.25rem] text-balance"
          >
            Горы, кофе и место,
            <span className="text-sierra-moss"> где хочется задержаться</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-sierra-ink/75"
          >
            Европейская кухня и обжарка, отель{' '}
            <strong className="font-medium text-sierra-forest">Madanur</strong> и
            уютный коворкинг — как в вашем любимом кафе у подножия Тянь-Шаня.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 text-sm text-sierra-moss/90"
          >
            HoReCa Awards 2025 · лучшая сервисная команда · лучший семейный отель
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/hotel"
                className="inline-flex items-center justify-center rounded-full bg-sierra-forest px-7 py-3.5 text-sm font-medium text-sierra-snow shadow-lift transition-colors hover:bg-sierra-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sierra-forest"
              >
                Забронировать номер
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center rounded-full border border-sierra-moss/35 bg-sierra-snow/60 px-7 py-3.5 text-sm font-medium text-sierra-forest backdrop-blur-sm transition-colors hover:border-sierra-moss/55 hover:bg-sierra-snow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sierra-moss"
              >
                Меню и напитки
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
