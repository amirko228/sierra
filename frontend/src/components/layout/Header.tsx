'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container } from './Container';
import { MountainMark } from '@/components/brand/MountainMark';

const links = [
  { href: '/', label: 'Главная' },
  { href: '/menu', label: 'Меню' },
  { href: '/hotel', label: 'Отель' },
  { href: '/coworking', label: 'Коворкинг' },
  { href: '/contact', label: 'Контакты' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-sierra-latte/90 bg-sierra-snow/75 shadow-soft backdrop-blur-xl"
    >
      <Container className="flex h-[4.25rem] items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sierra-deep transition-colors hover:text-sierra-forest"
        >
          <MountainMark className="h-9 w-9 transition-transform duration-300 group-hover:scale-105" />
          <span className="font-display text-lg font-medium tracking-tight">
            Sierra <span className="text-sierra-moss">Karakol</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Основная навигация"
          >
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                    active
                      ? 'text-sierra-deep'
                      : 'text-sierra-ink/70 hover:text-sierra-forest'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-sierra-latte/90 shadow-soft"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </Link>
              );
            })}
          </nav>
          <details className="group relative md:hidden">
            <summary className="cursor-pointer list-none rounded-xl border border-sierra-latte bg-sierra-snow/90 px-3.5 py-2 text-sm font-medium text-sierra-deep marker:hidden [&::-webkit-details-marker]:hidden">
              Меню
            </summary>
            <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-sierra-latte/80 bg-sierra-snow/95 py-2 shadow-lift backdrop-blur-md">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    pathname === l.href
                      ? 'bg-sierra-latte/80 font-medium text-sierra-deep'
                      : 'text-sierra-ink/80 hover:bg-sierra-latte/40'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </Container>
    </motion.header>
  );
}
