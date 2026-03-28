import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { CoworkingForm } from '@/components/forms/CoworkingForm';

export const metadata: Metadata = {
  title: 'Коворкинг — резервация места',
  description:
    'Забронируйте место в коворкинге Sierra Karakol: hot desk, тихая зона, переговорная.',
};

export default function CoworkingPage() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading
        eyebrow="Рабочее пространство"
        title="Коворкинг"
        subtitle="Выберите интервал времени и зону. После отправки заявки вы получите уведомление на стороне администратора."
      />
      <div className="max-w-3xl">
        <CoworkingForm />
      </div>
    </Container>
  );
}
