import Link from 'next/link';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-sierra-latte/80 bg-gradient-to-b from-sierra-latte/30 to-sierra-oat">
      <div
        className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-[120%] -translate-x-1/2 bg-gradient-to-t from-sierra-sage/10 to-transparent blur-2xl"
        aria-hidden
      />
      <Container className="relative py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <p className="font-display text-xl font-medium text-sierra-deep">
              Sierra Karakol
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-sierra-ink/72">
              Кофейня, отель Madanur и коворкинг — тёплый сервис в духе гор и европейской
              гостиничной школы.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm" aria-label="Нижнее меню">
            <Link href="/menu" className="text-sierra-forest/90 hover:text-sierra-moss">
              Меню
            </Link>
            <Link href="/hotel" className="text-sierra-forest/90 hover:text-sierra-moss">
              Бронь номера
            </Link>
            <Link
              href="/coworking"
              className="text-sierra-forest/90 hover:text-sierra-moss"
            >
              Коворкинг
            </Link>
            <Link href="/contact" className="text-sierra-forest/90 hover:text-sierra-moss">
              Связаться
            </Link>
          </nav>
        </div>
        <p className="mt-12 text-xs text-sierra-ink/45">
          © {new Date().getFullYear()} Sierra Karakol. Все права защищены.
        </p>
      </Container>
    </footer>
  );
}
