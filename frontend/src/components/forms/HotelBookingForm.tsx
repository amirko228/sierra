'use client';

import { useState, type FormEvent } from 'react';
import { postJson, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/Button';

export function HotelBookingForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await postJson('/bookings', {
        guestName: String(fd.get('guestName') ?? '').trim(),
        phone: String(fd.get('phone') ?? '').trim(),
        checkIn: String(fd.get('checkIn') ?? ''),
        checkOut: String(fd.get('checkOut') ?? ''),
        roomType: String(fd.get('roomType') ?? 'standard'),
        notes: String(fd.get('notes') ?? '').trim() || undefined,
      });
      setOk('Заявка отправлена. Мы свяжемся с вами для подтверждения.');
      form.reset();
    } catch (e2) {
      if (e2 instanceof ApiError) {
        setErr(
          Array.isArray(e2.body) ? e2.body.join(', ') : String(e2.message),
        );
      } else {
        setErr('Не удалось отправить. Проверьте соединение и попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-sierra-latte/90 bg-sierra-snow/85 p-6 shadow-soft backdrop-blur-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-sierra-ink/80">Имя</span>
          <input
            required
            name="guestName"
            className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 text-sierra-ink outline-none ring-sierra-forest/25 focus:ring-2"
            autoComplete="name"
          />
        </label>
        <label className="block text-sm">
          <span className="text-sierra-ink/80">Телефон</span>
          <input
            required
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 text-sierra-ink outline-none ring-sierra-forest/25 focus:ring-2"
            autoComplete="tel"
          />
        </label>
        <label className="block text-sm">
          <span className="text-sierra-ink/80">Заезд</span>
          <input
            required
            name="checkIn"
            type="date"
            className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 text-sierra-ink outline-none ring-sierra-forest/25 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-sierra-ink/80">Выезд</span>
          <input
            required
            name="checkOut"
            type="date"
            className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 text-sierra-ink outline-none ring-sierra-forest/25 focus:ring-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-sierra-ink/80">Тип номера</span>
        <select
          name="roomType"
          defaultValue="standard"
          className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 text-sierra-ink outline-none ring-sierra-forest/25 focus:ring-2"
        >
          <option value="standard">Стандарт</option>
          <option value="comfort">Комфорт</option>
          <option value="family">Семейный</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-sierra-ink/80">Комментарий (необязательно)</span>
        <textarea
          name="notes"
          rows={3}
          className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 text-sierra-ink outline-none ring-sierra-forest/25 focus:ring-2"
        />
      </label>
      {ok && (
        <p className="text-sm font-medium text-green-800" role="status">
          {ok}
        </p>
      )}
      {err && (
        <p className="text-sm font-medium text-red-700" role="alert">
          {err}
        </p>
      )}
      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? 'Отправка…' : 'Отправить заявку'}
      </Button>
    </form>
  );
}
