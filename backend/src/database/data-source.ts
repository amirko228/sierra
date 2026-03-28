import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Booking } from '../bookings/entities/booking.entity';
import { CoworkingReservation } from '../coworking/entities/coworking-reservation.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { MenuCategory } from '../menu/entities/menu-category.entity';
import { MenuItem } from '../menu/entities/menu-item.entity';

config({ path: '.env' });

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
  username: process.env.DATABASE_USER ?? 'sierra',
  password: process.env.DATABASE_PASSWORD ?? 'sierra_secret',
  database: process.env.DATABASE_NAME ?? 'sierra_karakol',
  entities: [
    Booking,
    CoworkingReservation,
    Contact,
    MenuCategory,
    MenuItem,
  ],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
});
