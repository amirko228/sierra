import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import configuration from './config/configuration';
import { winstonConfig } from './config/winston.config';
import { typeOrmConfigFactory } from './database/typeorm.config';
import { BookingsModule } from './bookings/bookings.module';
import { CoworkingModule } from './coworking/coworking.module';
import { ContactsModule } from './contacts/contacts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { MenuModule } from './menu/menu.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    WinstonModule.forRootAsync({
      useFactory: () => winstonConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    BookingsModule,
    CoworkingModule,
    ContactsModule,
    NotificationsModule,
    MenuModule,
    AdminModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
