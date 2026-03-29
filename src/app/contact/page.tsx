import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Свяжитесь с Sierra Karakol: форма обратной связи, бронирования и вопросы по отелю и коворкингу.',
};

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Связь"
        title="Контакты"
        subtitle="Оставьте сообщение — мы передадим его команде и ответим по email или телефону."
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <ContactForm />
        <div className="rounded-3xl bg-gradient-to-br from-sierra-forest via-sierra-moss to-sierra-deep p-8 text-sierra-snow shadow-lift">
          <h2 className="font-display text-lg font-medium">На месте</h2>
          <p className="mt-3 text-sm text-sierra-snow/82">
            <span className="block font-medium text-sierra-snow">Sierra Coffee · Madanur</span>
            <span className="mt-2 block">
              98, автодорога А363, Каракол (Пржевальск), Иссык-Кульская область, Кыргызстан
            </span>
            <span className="mt-2 block">Ежедневно 7:30–23:00</span>
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a
              className="font-medium text-sierra-cream underline decoration-sierra-cream/50 underline-offset-2 hover:decoration-sierra-cream"
              href="https://www.google.com/maps/search/Sierra+Coffee+Karakol"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Maps
            </a>
            <a
              className="font-medium text-sierra-cream underline decoration-sierra-cream/50 underline-offset-2 hover:decoration-sierra-cream"
              href="https://2gis.kg/search/Sierra%20Karakol"
              target="_blank"
              rel="noopener noreferrer"
            >
              2GIS
            </a>
            <a
              className="font-medium text-sierra-cream underline decoration-sierra-cream/50 underline-offset-2 hover:decoration-sierra-cream"
              href="https://sierra.madanur.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              sierra.madanur.com
            </a>
          </p>
          <p className="mt-6 text-sm text-sierra-snow/78">
            Сообщение из формы сразу попадает к нам — обычно отвечаем в тот же день.
          </p>
        </div>
      </div>
    </Container>
  );
}
