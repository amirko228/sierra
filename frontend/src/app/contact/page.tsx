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
            Каракол, Kyrgyzstan
            <br />
            Замените этот блок на реальный адрес, часы работы и ссылки на 2GIS /
            Google Maps.
          </p>
          <p className="mt-6 text-sm text-sierra-snow/78">
            Интеграции Telegram и WhatsApp настраиваются через переменные окружения
            API — см. README в корне проекта.
          </p>
        </div>
      </div>
    </Container>
  );
}
