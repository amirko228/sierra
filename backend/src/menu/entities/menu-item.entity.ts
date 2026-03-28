import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { MenuCategory } from './menu-category.entity';

@Entity('menu_items')
@Index(['categoryId', 'itemKey'], { unique: true })
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId!: string;

  @ManyToOne(() => MenuCategory, (c) => c.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category!: MenuCategory;

  /** Стабильный ключ позиции (как раньше id на фронте). */
  @Column({ name: 'item_key', length: 80 })
  itemKey!: string;

  @Column({ length: 200 })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ length: 100 })
  price!: string;

  @Column({ type: 'jsonb', nullable: true })
  tags!: string[] | null;

  @Column({ name: 'sort_order', type: 'int', default: 0 })
  sortOrder!: number;
}
