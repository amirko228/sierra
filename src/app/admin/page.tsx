'use client';

import { useCallback, useState } from 'react';
import { getJson, ApiError } from '@/lib/api';
import { MenuEditor } from '@/components/admin/MenuEditor';

type Booking = {
  id: string;
  guestName: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  createdAt: string;
};

type Coworking = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  startAt: string;
  endAt: string;
  seatLabel: string;
  createdAt: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
};

type Summary = {
  counts: {
    bookings: number;
    coworkingReservations: number;
    contacts: number;
  };
  recentBookings: Booking[];
  recentCoworking: Coworking[];
  recentContacts: Contact[];
};

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [tab, setTab] = useState<'summary' | 'menu'>('summary');
  const [data, setData] = useState<Summary | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!key.trim()) {
      setErr('Введите admin-ключ');
      return;
    }
    setLoading(true);
    setErr(null);
    try {
      const res = await getJson<Summary>('/admin/summary', key.trim());
      setData(res);
    } catch (e) {
      if (e instanceof ApiError) {
        setErr('Нет доступа или ошибка API');
      } else {
        setErr('Ошибка загрузки');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [key]);

  return (
    <div className="min-h-[60vh] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-sierra-ink">
          Админ-панель
        </h1>
        <p className="mt-2 text-sm text-sierra-ink/70">
          Ключ — заголовок{' '}
          <code className="rounded bg-sierra-mist px-1">x-admin-key</code> (
          <code className="rounded bg-sierra-mist px-1">ADMIN_API_KEY</code> в{' '}
          <code className="rounded bg-sierra-mist px-1">backend/.env</code>).
        </p>
        <div className="mt-6 flex flex-wrap items-end gap-3">
          <label className="block text-sm">
            Admin key
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="mt-1 block w-64 rounded-xl border border-sierra-mist bg-white px-3 py-2"
              autoComplete="off"
            />
          </label>
        </div>

        <div className="mt-6 flex gap-1 rounded-full border border-sierra-mist bg-sierra-cream/80 p-1">
          <button
            type="button"
            onClick={() => setTab('summary')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === 'summary'
                ? 'bg-white text-sierra-ink shadow-sm'
                : 'text-sierra-ink/70 hover:text-sierra-ink'
            }`}
          >
            Заявки
          </button>
          <button
            type="button"
            onClick={() => setTab('menu')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === 'menu'
                ? 'bg-white text-sierra-ink shadow-sm'
                : 'text-sierra-ink/70 hover:text-sierra-ink'
            }`}
          >
            Меню
          </button>
        </div>

        {tab === 'summary' && (
          <div className="mt-6">
            <button
              type="button"
              onClick={() => void load()}
              disabled={loading}
              className="rounded-full bg-sierra-pine px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {loading ? 'Загрузка…' : 'Показать сводку'}
            </button>
            {err && tab === 'summary' && (
              <p className="mt-4 text-sm text-red-700">{err}</p>
            )}

            {data && (
              <div className="mt-10 space-y-10">
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-sierra-sand">
                    Счётчики
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-4">
                    <span className="rounded-xl border border-sierra-mist bg-white px-4 py-3 text-sm">
                      Брони: <strong>{data.counts.bookings}</strong>
                    </span>
                    <span className="rounded-xl border border-sierra-mist bg-white px-4 py-3 text-sm">
                      Коворкинг:{' '}
                      <strong>{data.counts.coworkingReservations}</strong>
                    </span>
                    <span className="rounded-xl border border-sierra-mist bg-white px-4 py-3 text-sm">
                      Контакты: <strong>{data.counts.contacts}</strong>
                    </span>
                  </div>
                </section>

                <section>
                  <h2 className="font-medium text-sierra-pine">
                    Последние брони
                  </h2>
                  <ul className="mt-3 divide-y divide-sierra-mist rounded-xl border border-sierra-mist bg-white text-sm">
                    {data.recentBookings.map((b) => (
                      <li key={b.id} className="px-4 py-3">
                        {b.guestName} — {b.phone} · {b.checkIn} → {b.checkOut}{' '}
                        ({b.roomType})
                      </li>
                    ))}
                    {data.recentBookings.length === 0 && (
                      <li className="px-4 py-6 text-sierra-ink/50">Пока пусто</li>
                    )}
                  </ul>
                </section>

                <section>
                  <h2 className="font-medium text-sierra-pine">Коворкинг</h2>
                  <ul className="mt-3 divide-y divide-sierra-mist rounded-xl border border-sierra-mist bg-white text-sm">
                    {data.recentCoworking.map((c) => (
                      <li key={c.id} className="px-4 py-3">
                        {c.name} — {c.seatLabel} ·{' '}
                        {new Date(c.startAt).toLocaleString('ru-RU')} —{' '}
                        {new Date(c.endAt).toLocaleString('ru-RU')}
                      </li>
                    ))}
                    {data.recentCoworking.length === 0 && (
                      <li className="px-4 py-6 text-sierra-ink/50">Пока пусто</li>
                    )}
                  </ul>
                </section>

                <section>
                  <h2 className="font-medium text-sierra-pine">Лиды</h2>
                  <ul className="mt-3 divide-y divide-sierra-mist rounded-xl border border-sierra-mist bg-white text-sm">
                    {data.recentContacts.map((c) => (
                      <li key={c.id} className="px-4 py-3">
                        <span className="font-medium">{c.name}</span>{' '}
                        <span className="text-sierra-ink/70">
                          &lt;{c.email}&gt;
                        </span>
                        <p className="mt-1 line-clamp-2 text-sierra-ink/70">
                          {c.message}
                        </p>
                      </li>
                    ))}
                    {data.recentContacts.length === 0 && (
                      <li className="px-4 py-6 text-sierra-ink/50">Пока пусто</li>
                    )}
                  </ul>
                </section>
              </div>
            )}
          </div>
        )}

        {tab === 'menu' && (
          <div className="mt-8">
            <MenuEditor adminKey={key.trim()} />
          </div>
        )}
      </div>
    </div>
  );
}
