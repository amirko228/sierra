import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { FadeIn } from '@/components/motion/FadeIn';
import { getMenuCategories } from '@/lib/menu';

export const metadata: Metadata = {
  title: 'Меню',
  description:
    'Напитки и еда в кофейне Sierra Karakol — эспрессо, фильтр, завтраки и десерты.',
};

export default async function MenuPage() {
  const menuCategories = await getMenuCategories();

  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading
        eyebrow="Кофейня"
        title="Меню"
        subtitle="Цены ориентировочные — уточняйте у бариста актуальное меню дня."
      />
      <div className="space-y-16">
        {menuCategories.map((cat) => (
          <section key={cat.slug} id={cat.slug}>
            <h2 className="font-display text-2xl font-medium text-sierra-deep">
              {cat.title}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {cat.items.map((item) => (
                <FadeIn key={item.id}>
                  <li className="group rounded-3xl border border-sierra-latte/90 bg-sierra-snow/70 p-6 sm:p-7 shadow-soft backdrop-blur-sm transition-all duration-300 hover:border-sierra-sage/35 hover:shadow-lift">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-sierra-deep">{item.name}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-sierra-ink/70">
                          {item.description}
                        </p>
                        {item.tags?.length ? (
                          <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-sierra-clay/90">
                            {item.tags.join(' · ')}
                          </p>
                        ) : null}
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-sierra-moss">
                        {item.price}
                      </p>
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}
