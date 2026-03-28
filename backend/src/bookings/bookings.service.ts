import {
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    @InjectRepository(Booking)
    private readonly repo: Repository<Booking>,
    private readonly notifications: NotificationsService,
  ) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    const inDate = new Date(dto.checkIn);
    const outDate = new Date(dto.checkOut);
    if (outDate <= inDate) {
      throw new BadRequestException('checkOut must be after checkIn');
    }

    const entity = this.repo.create({
      guestName: dto.guestName,
      phone: dto.phone,
      checkIn: dto.checkIn.slice(0, 10),
      checkOut: dto.checkOut.slice(0, 10),
      notes: dto.notes,
      roomType: dto.roomType ?? 'standard',
    });
    const saved = await this.repo.save(entity);

    void this.notifications
      .notifyBookingCreated({
        guestName: saved.guestName,
        phone: saved.phone,
        checkIn: saved.checkIn,
        checkOut: saved.checkOut,
        roomType: saved.roomType,
        id: saved.id,
      })
      .catch((err) =>
        this.logger.warn(`Notification failed for booking ${saved.id}: ${err}`),
      );

    return saved;
  }

  async findAll(): Promise<Booking[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}
