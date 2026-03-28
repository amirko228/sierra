import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminGuard } from './admin.guard';
import { BookingsModule } from '../bookings/bookings.module';
import { CoworkingModule } from '../coworking/coworking.module';
import { ContactsModule } from '../contacts/contacts.module';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [BookingsModule, CoworkingModule, ContactsModule, MenuModule],
  controllers: [AdminController],
  providers: [AdminGuard],
})
export class AdminModule {}
