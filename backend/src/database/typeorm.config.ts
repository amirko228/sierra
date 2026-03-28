import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Booking } from '../bookings/entities/booking.entity';
import { CoworkingReservation } from '../coworking/entities/coworking-reservation.entity';
import { Contact } from '../contacts/entities/contact.entity';
import { MenuCategory } from '../menu/entities/menu-category.entity';
import { MenuItem } from '../menu/entities/menu-item.entity';

export function typeOrmConfigFactory(
  config: ConfigService,
): TypeOrmModuleOptions {
  const db = config.get<{
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  }>('database')!;
  return {
    type: 'postgres',
    host: db.host,
    port: db.port,
    username: db.user,
    password: db.password,
    database: db.name,
    entities: [
      Booking,
      CoworkingReservation,
      Contact,
      MenuCategory,
      MenuItem,
    ],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  };
}
