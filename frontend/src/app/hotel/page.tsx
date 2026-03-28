import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { HotelBookingForm } from '@/components/forms/HotelBookingForm';

export const metadata: Metadata = {
  title: 'Отель Madanur — бронирование',
  description:
    'Забронируйте номер в отеле Madanur у Sierra Karakol в Караколе. Заезд, выезд, контактные данные.',
};

export default function HotelPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Проживание"
        title="Отель Madanur"
        subtitle="Оставьте заявку с датами — администратор подтвердит наличие и стоимость. Для срочных вопросов звоните или пишите в мессенджеры."
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <HotelBookingForm />
        <aside className="rounded-3xl border border-sierra-latte/80 bg-sierra-latte/25 p-7 text-sm text-sierra-ink/75 backdrop-blur-sm">
          <h2 className="font-display text-lg font-medium text-sierra-deep">
            Для гостей
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Хранение багажа и помощь с трансфером по запросу.</li>
            <li>Совместное проживание с кофейней — завтраки и кофе без лишней дороги.</li>
            <li>Точное время заезда/выезда обсуждается при подтверждении.</li>
          </ul>
        </aside>
      </div>
    </Container>
  );
}
