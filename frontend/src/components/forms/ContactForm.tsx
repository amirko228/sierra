'use client';

import { useState, type FormEvent } from 'react';
import { postJson, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/Button';

export function ContactForm() {
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
      await postJson('/contacts', {
        name: String(fd.get('name') ?? '').trim(),
        email: String(fd.get('email') ?? '').trim(),
        phone: String(fd.get('phone') ?? '').trim() || undefined,
        message: String(fd.get('message') ?? '').trim(),
        source: 'website-contact',
      });
      setOk('Сообщение отправлено. Спасибо!');
      form.reset();
    } catch (e2) {
      if (e2 instanceof ApiError) {
        const body = e2.body as { message?: unknown } | unknown;
        if (
          body &&
          typeof body === 'object' &&
          'message' in body &&
          Array.isArray((body as { message: unknown }).message)
        ) {
          setErr(
            ((body as { message: string[] }).message).join(', '),
          );
        } else {
          setErr(String(e2.message));
        }
      } else {
        setErr('Ошибка сети. Попробуйте позже.');
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
          />
        </label>
        <label className="block text-sm">
          <span className="text-sierra-ink/80">Email</span>
          <input
            required
            name="email"
            type="email"
            className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 outline-none ring-sierra-forest/25 focus:ring-2"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-sierra-ink/80">Телефон (необязательно)</span>
          <input
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 outline-none ring-sierra-forest/25 focus:ring-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-sierra-ink/80">Сообщение</span>
        <textarea
          required
          name="message"
          rows={4}
          className="mt-1 w-full rounded-xl border border-sierra-latte bg-sierra-oat/80 px-3 py-2 outline-none ring-sierra-forest/25 focus:ring-2"
        />
      </label>
      {ok && <p className="text-sm font-medium text-green-800">{ok}</p>}
      {err && <p className="text-sm font-medium text-red-700">{err}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Отправка…' : 'Отправить'}
      </Button>
    </form>
  );
}
