export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  tags?: string[];
};

export type MenuCategory = {
  slug: string;
  title: string;
  items: MenuItem[];
};

/** Запасное меню, если API недоступен. */
export const menuCategoriesFallback: MenuCategory[] = [
  {
    slug: 'coffee',
    title: 'Кофе и напитки',
    items: [
      {
        id: 'espresso',
        name: 'Эспрессо',
        description: 'Классика, обжарка под горы Тянь-Шаня.',
        price: '150 с',
      },
      {
        id: 'cap',
        name: 'Капучино',
        description: 'Молоко и двойной шот, бархатная пенка.',
        price: '220 с',
      },
      {
        id: 'filter',
        name: 'Фильтр-кофе',
        description: 'Сезонный сингл-ориджин, V60.',
        price: '200 с',
      },
      {
        id: 'tea',
        name: 'Горный чай',
        description: 'Травяной сбор, мёд по желанию.',
        price: '120 с',
      },
    ],
  },
  {
    slug: 'food',
    title: 'Еда',
    items: [
      {
        id: 'morning',
        name: 'Завтрак Sierra',
        description: 'Яйца, сыр, овощи, домашний хлеб.',
        price: '480 с',
        tags: ['популярное'],
      },
      {
        id: 'soup',
        name: 'Суп дня',
        description: 'Спросите бариста — меняется ежедневно.',
        price: '320 с',
      },
      {
        id: 'sandwich',
        name: 'Сэндвич с индейкой',
        description: 'Соус цитрус-горчица, салат, томат.',
        price: '360 с',
      },
      {
        id: 'dessert',
        name: 'Десерт от кондитера',
        description: 'Брауни или чизкейк — по наличию.',
        price: '280 с',
      },
    ],
  },
];

/** @deprecated Используйте menuCategoriesFallback; оставлено для совместимости импортов. */
export const menuCategories = menuCategoriesFallback;
