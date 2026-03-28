import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  variable: '--font-geist',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sierra Karakol — кофе, отель Madanur, коворкинг',
    template: '%s | Sierra Karakol',
  },
  description:
    'Sierra Karakol в Караколе: кофейня с меню, бронирование номеров отеля Madanur и рабочие места коворкинга. Онлайн-заявки и быстрый ответ.',
  keywords: [
    'Karakol',
    'Sierra Karakol',
    'Madanur',
    'коворкинг',
    'отель Каракол',
    'кофейня',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'Sierra Karakol',
    title: 'Sierra Karakol',
    description:
      'Кофе, отель и коворкинг. Бронируйте онлайн и пишите нам с сайта.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen font-sans text-sierra-ink">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
