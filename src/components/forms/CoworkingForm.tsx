'use client';

import { useState, type FormEvent } from 'react';
import { postJson, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/Button';

function toIsoFromDatetimeLocal(val: string): string {
  if (!val) return '';
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString();
}

export function CoworkingForm() {
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
    const startAt = toIsoFromDatetimeLocal(String(fd.get('startAt') ?? ''));
    const endAt = toIsoFromDatetimeLocal(String(fd.get('endAt') ?? ''));
    try {
      await postJson('/coworking/reservations', {
        name: String(fd.get('name') ?? '').trim(),
        phone: String(fd.get('phone') ?? '').trim(),
        email: String(fd.get('email') ?? '').trim() || undefined,
        startAt,
        endAt,
        seatLabel: String(fd.get('seatLabel') ?? 'hot-desk').trim(),
        notes: String(fd.get('notes') ?? '').trim() || undefined,
      });
      setOk('Место зарезервировано в системе. Ожидайте подтверждения от администратора.');
      form.reset();
    } catch (e2) {
      if (e2 instanceof ApiError) {
        setErr(
          Array.isArray(e2.body) ? e2.body.join(', ') : String(e2.message),
        );
      } else {
        setErr('Не удалось отправить. Попробуйте ещё раз.');
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
            name="name"
            className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 outline-none ring-sierra-forest/25 focus:ring-2"
            autoComplete="name"
          />
        </label>
        <label className="block text-sm">
          <span className="text-sierra-ink/80">Телефон</span>
          <input
            required
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 outline-none ring-sierra-forest/25 focus:ring-2"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-sierra-ink/80">Email (необязательно)</span>
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 outline-none ring-sierra-forest/25 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-sierra-ink/80">Начало</span>
          <input
            required
            name="startAt"
            type="datetime-local"
            className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 outline-none ring-sierra-forest/25 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-sierra-ink/80">Окончание</span>
          <input
            required
            name="endAt"
            type="datetime-local"
            className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 outline-none ring-sierra-forest/25 focus:ring-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-sierra-ink/80">Место / зона</span>
        <select
          name="seatLabel"
          defaultValue="hot-desk"
          className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 outline-none ring-sierra-forest/25 focus:ring-2"
        >
          <option value="hot-desk">Hot desk — открытый зал</option>
          <option value="quiet">Тихая зона</option>
          <option value="meeting-small">Переговорная (до 4 чел.)</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-sierra-ink/80">Комментарий</span>
        <textarea
          name="notes"
          rows={2}
          className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 outline-none ring-sierra-forest/25 focus:ring-2"
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
      <Button type="submit" disabled={loading}>
        {loading ? 'Отправка…' : 'Забронировать место'}
      </Button>
    </form>
  );
}
