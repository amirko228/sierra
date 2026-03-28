import type { MenuCategory } from '@/data/menu';
import { menuCategoriesFallback } from '@/data/menu';

function apiBase(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ??
    'http://localhost:4000/api'
  );
}

/** Меню с API; при ошибке — локальный запасной вариант. */
export async function getMenuCategories(): Promise<MenuCategory[]> {
  try {
    const res = await fetch(`${apiBase()}/menu`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return menuCategoriesFallback;
    const data = (await res.json()) as { categories: MenuCategory[] };
    if (!data.categories?.length) return menuCategoriesFallback;
    return data.categories;
  } catch {
    return menuCategoriesFallback;
  }
}
