'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';

const ease = [0.22, 1, 0.36, 1] as const;

const cards = [
  {
    emoji: '☕',
    title: 'Кофейня',
    text: 'Обжарка, завтраки и десерты — до выхода на маршрут или после похода.',
    href: '/menu',
    accent: 'from-sierra-sage/15 to-sierra-mist/30',
  },
  {
    emoji: '🏨',
    title: 'Madanur Hotel',
    text: 'Семейный отель с тёплым приёмом и спокойным двором — команда HoReCa Awards.',
    href: '/hotel',
    accent: 'from-sierra-honey/15 to-sierra-latte/40',
  },
  {
    emoji: '💻',
    title: 'Коворкинг',
    text: 'Свет, тишина и кофе под рукой — работайте с комфортом в сердце Каракола.',
    href: '/coworking',
    accent: 'from-sierra-dusk/10 to-sierra-mist/25',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export function ServiceShowcase() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sierra-clay">
            Три повода зайти
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-sierra-deep sm:text-4xl">
            Один дух Sierra — три пространства
          </h2>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-7 md:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.li key={card.title} variants={item}>
              <motion.article
                whileHover={{ y: -6, transition: { duration: 0.35, ease } }}
                className={`group relative h-full overflow-hidden rounded-3xl border border-sierra-latte/80 bg-gradient-to-br ${card.accent} p-8 shadow-soft backdrop-blur-sm`}
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-sierra-snow/40 blur-2xl transition-opacity group-hover:opacity-100" />
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-sierra-latte/60 bg-sierra-snow/85 text-2xl shadow-soft"
                  aria-hidden
                >
                  {card.emoji}
                </motion.div>
                <h3 className="font-display text-xl font-medium text-sierra-deep">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-sierra-ink/72">
                  {card.text}
                </p>
                <Link
                  href={card.href}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-sierra-forest transition-colors hover:text-sierra-moss"
                >
                  Подробнее
                  <motion.span
                    className="inline-block"
                    initial={false}
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
