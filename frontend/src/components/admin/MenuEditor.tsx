'use client';

import { useCallback, useState } from 'react';
import { getJson, putJson, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/Button';

type EditableItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  tagsStr: string;
};

type EditableCategory = {
  slug: string;
  title: string;
  items: EditableItem[];
};

export function MenuEditor({ adminKey }: { adminKey: string }) {
  const [cats, setCats] = useState<EditableCategory[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!adminKey.trim()) {
      setErr('Сначала введите admin-ключ');
      return;
    }
    setLoading(true);
    setErr(null);
    setOk(null);
    try {
      const data = await getJson<{
        categories: {
          slug: string;
          title: string;
          items: {
            id: string;
            name: string;
            description: string;
            price: string;
            tags?: string[];
          }[];
        }[];
      }>('/admin/menu', adminKey);
      setCats(
        data.categories.map((c) => ({
          slug: c.slug,
          title: c.title,
          items: c.items.map((i) => ({
            id: i.id,
            name: i.name,
            description: i.description,
            price: i.price,
            tagsStr: i.tags?.join(', ') ?? '',
          })),
        })),
      );
      setOk('Меню загружено из базы');
    } catch {
      setErr('Не удалось загрузить меню — проверьте ключ');
      setCats(null);
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  const save = useCallback(async () => {
    if (!adminKey.trim() || !cats?.length) return;
    setSaving(true);
    setErr(null);
    setOk(null);
    try {
      const body = {
        categories: cats.map((c, ci) => ({
          slug: c.slug,
          title: c.title,
          sortOrder: ci,
          items: c.items.map((it, ii) => ({
            id: it.id,
            name: it.name,
            description: it.description,
            price: it.price,
            tags: it.tagsStr.split(',').map((t) => t.trim()).filter(Boolean),
            sortOrder: ii,
          })),
        })),
      };
      await putJson('/admin/menu', body, adminKey);
      setOk('Меню сохранено. Страница «Меню» на сайте обновится в течение ~30 с.');
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  }, [adminKey, cats]);

  const updateCat = (index: number, patch: Partial<EditableCategory>) => {
    setCats((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  };

  const updateItem = (
    ci: number,
    ii: number,
    patch: Partial<EditableItem>,
  ) => {
    setCats((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      const items = [...next[ci].items];
      items[ii] = { ...items[ii], ...patch };
      next[ci] = { ...next[ci], items };
      return next;
    });
  };

  const addCategory = () => {
    const id = `cat-${Date.now()}`;
    setCats((prev) => [
      ...(prev ?? []),
      { slug: id, title: 'Новая категория', items: [] },
    ]);
  };

  const removeCategory = (ci: number) => {
    setCats((prev) => (prev ? prev.filter((_, i) => i !== ci) : null));
  };

  const addItem = (ci: number) => {
    setCats((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      const item: EditableItem = {
        id: `item-${Date.now()}`,
        name: 'Позиция',
        description: '',
        price: '',
        tagsStr: '',
      };
      next[ci] = {
        ...next[ci],
        items: [...next[ci].items, item],
      };
      return next;
    });
  };

  const removeItem = (ci: number, ii: number) => {
    setCats((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      next[ci] = {
        ...next[ci],
        items: next[ci].items.filter((_, j) => j !== ii),
      };
      return next;
    });
  };

  return (
    <div className="space-y-6 rounded-2xl border border-sierra-mist bg-white/90 p-6">
      <p className="text-sm text-sierra-ink/75">
        Редактирование сохраняется в PostgreSQL. Ключ «id» у позиции — внутренний
        код (латиница, без пробелов); для гостей на сайте не показывается.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => void load()} disabled={loading}>
          {loading ? 'Загрузка…' : 'Загрузить меню'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => void save()}
          disabled={saving || !cats?.length}
        >
          {saving ? 'Сохранение…' : 'Сохранить'}
        </Button>
        <Button type="button" variant="ghost" onClick={addCategory}>
          + Категория
        </Button>
      </div>
      {ok && <p className="text-sm font-medium text-green-800">{ok}</p>}
      {err && <p className="text-sm font-medium text-red-700">{err}</p>}

      {cats?.map((cat, ci) => (
        <fieldset
          key={`${cat.slug}-${ci}`}
          className="rounded-xl border border-sierra-mist/80 p-4"
        >
          <legend className="px-1 text-sm font-medium text-sierra-pine">
            Категория
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-sierra-ink/70">Slug (URL-якорь)</span>
              <input
                value={cat.slug}
                onChange={(e) => updateCat(ci, { slug: e.target.value })}
                className="mt-1 w-full rounded-lg border border-sierra-mist bg-sierra-cream px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm">
              <span className="text-sierra-ink/70">Заголовок</span>
              <input
                value={cat.title}
                onChange={(e) => updateCat(ci, { title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-sierra-mist bg-sierra-cream px-3 py-2 text-sm"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={() => removeCategory(ci)}
            className="mt-2 text-xs text-red-600 hover:underline"
          >
            Удалить категорию
          </button>

          <div className="mt-4 space-y-3 border-t border-sierra-mist/60 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-sierra-ink">Позиции</span>
              <button
                type="button"
                onClick={() => addItem(ci)}
                className="text-sm text-sierra-pine hover:underline"
              >
                + Позиция
              </button>
            </div>
            {cat.items.map((it, ii) => (
              <div
                key={`${it.id}-${ii}`}
                className="rounded-lg bg-sierra-cream/50 p-3 text-sm"
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sierra-ink/60">id</span>
                    <input
                      value={it.id}
                      onChange={(e) =>
                        updateItem(ci, ii, { id: e.target.value })
                      }
                      className="mt-0.5 w-full rounded border border-sierra-mist bg-white px-2 py-1"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sierra-ink/60">Цена</span>
                    <input
                      value={it.price}
                      onChange={(e) =>
                        updateItem(ci, ii, { price: e.target.value })
                      }
                      className="mt-0.5 w-full rounded border border-sierra-mist bg-white px-2 py-1"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sierra-ink/60">Название</span>
                    <input
                      value={it.name}
                      onChange={(e) =>
                        updateItem(ci, ii, { name: e.target.value })
                      }
                      className="mt-0.5 w-full rounded border border-sierra-mist bg-white px-2 py-1"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sierra-ink/60">Описание</span>
                    <textarea
                      value={it.description}
                      onChange={(e) =>
                        updateItem(ci, ii, { description: e.target.value })
                      }
                      rows={2}
                      className="mt-0.5 w-full rounded border border-sierra-mist bg-white px-2 py-1"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sierra-ink/60">
                      Теги (через запятую)
                    </span>
                    <input
                      value={it.tagsStr}
                      onChange={(e) =>
                        updateItem(ci, ii, { tagsStr: e.target.value })
                      }
                      className="mt-0.5 w-full rounded border border-sierra-mist bg-white px-2 py-1"
                      placeholder="популярное, новинка"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(ci, ii)}
                  className="mt-2 text-xs text-red-600 hover:underline"
                >
                  Удалить позицию
                </button>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
