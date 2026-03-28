import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MenuCategory } from './entities/menu-category.entity';
import { MenuItem } from './entities/menu-item.entity';
import { ReplaceMenuDto } from './dto/replace-menu.dto';
import { DEFAULT_MENU_CATEGORIES } from './default-menu';

export type PublicMenuResponse = {
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
};

@Injectable()
export class MenuService implements OnModuleInit {
  constructor(
    @InjectRepository(MenuCategory)
    private readonly categoryRepo: Repository<MenuCategory>,
    private readonly dataSource: DataSource,
  ) {}

  async onModuleInit(): Promise<void> {
    const n = await this.categoryRepo.count();
    if (n === 0) {
      await this.replaceMenu(this.buildDefaultDto());
    }
  }

  private buildDefaultDto(): ReplaceMenuDto {
    return {
      categories: DEFAULT_MENU_CATEGORIES.map((c, ci) => ({
        slug: c.slug,
        title: c.title,
        sortOrder: c.sortOrder ?? ci,
        items: c.items.map((it, ii) => ({
          id: it.id,
          name: it.name,
          description: it.description,
          price: it.price,
          tags: it.tags?.length ? [...it.tags] : [],
          sortOrder: it.sortOrder ?? ii,
        })),
      })),
    };
  }

  async getPublicMenu(): Promise<PublicMenuResponse> {
    const cats = await this.categoryRepo.find({
      relations: { items: true },
    });
    cats.sort((a, b) => a.sortOrder - b.sortOrder);

    return {
      categories: cats.map((c) => ({
        slug: c.slug,
        title: c.title,
        items: [...c.items]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((i) => ({
            id: i.itemKey,
            name: i.name,
            description: i.description,
            price: i.price,
            tags: i.tags?.length ? i.tags : undefined,
          })),
      })),
    };
  }

  async replaceMenu(dto: ReplaceMenuDto): Promise<PublicMenuResponse> {
    await this.dataSource.transaction(async (manager) => {
      await manager.createQueryBuilder().delete().from(MenuItem).execute();
      await manager.createQueryBuilder().delete().from(MenuCategory).execute();

      for (let ci = 0; ci < dto.categories.length; ci++) {
        const c = dto.categories[ci];
        const cat = manager.create(MenuCategory, {
          slug: c.slug.trim(),
          title: c.title.trim(),
          sortOrder: c.sortOrder ?? ci,
        });
        await manager.save(cat);
        for (let ii = 0; ii < c.items.length; ii++) {
          const it = c.items[ii];
          const tagList = (it.tags ?? [])
            .map((t) => t.trim())
            .filter((t) => t.length > 0);
          const row = manager.create(MenuItem, {
            categoryId: cat.id,
            itemKey: it.id.trim(),
            name: it.name.trim(),
            description: it.description.trim(),
            price: it.price.trim(),
            tags: tagList.length ? tagList : null,
            sortOrder: it.sortOrder ?? ii,
          });
          await manager.save(row);
        }
      }
    });
    return this.getPublicMenu();
  }
}
