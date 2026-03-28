import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from './admin.guard';
import { BookingsService } from '../bookings/bookings.service';
import { CoworkingService } from '../coworking/coworking.service';
import { ContactsService } from '../contacts/contacts.service';
import { MenuService } from '../menu/menu.service';
import { ReplaceMenuDto } from '../menu/dto/replace-menu.dto';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(
    private readonly bookings: BookingsService,
    private readonly coworking: CoworkingService,
    private readonly contacts: ContactsService,
    private readonly menu: MenuService,
  ) {}

  @Get('bookings')
  listBookings() {
    return this.bookings.findAll();
  }

  @Get('coworking')
  listCoworking() {
    return this.coworking.findAll();
  }

  @Get('contacts')
  listContacts() {
    return this.contacts.findAll();
  }

  @Get('menu')
  getMenu() {
    return this.menu.getPublicMenu();
  }

  @Put('menu')
  replaceMenu(@Body() dto: ReplaceMenuDto) {
    return this.menu.replaceMenu(dto);
  }

  @Get('summary')
  async summary() {
    const [bookings, coworking, contacts] = await Promise.all([
      this.bookings.findAll(),
      this.coworking.findAll(),
      this.contacts.findAll(),
    ]);
    return {
      counts: {
        bookings: bookings.length,
        coworkingReservations: coworking.length,
        contacts: contacts.length,
      },
      recentBookings: bookings.slice(0, 10),
      recentCoworking: coworking.slice(0, 10),
      recentContacts: contacts.slice(0, 10),
    };
  }
}
