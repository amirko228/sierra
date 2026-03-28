import {
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoworkingReservationDto } from './dto/create-coworking-reservation.dto';
import { CoworkingReservation } from './entities/coworking-reservation.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CoworkingService {
  private readonly logger = new Logger(CoworkingService.name);

  constructor(
    @InjectRepository(CoworkingReservation)
    private readonly repo: Repository<CoworkingReservation>,
    private readonly notifications: NotificationsService,
  ) {}

  async create(dto: CreateCoworkingReservationDto): Promise<CoworkingReservation> {
    const start = new Date(dto.startAt);
    const end = new Date(dto.endAt);
    if (end <= start) {
      throw new BadRequestException('endAt must be after startAt');
    }

    const entity = this.repo.create({
      name: dto.name,
      phone: dto.phone,
      email: dto.email,
      startAt: start,
      endAt: end,
      seatLabel: dto.seatLabel ?? 'hot-desk',
      notes: dto.notes,
    });
    const saved = await this.repo.save(entity);

    void this.notifications
      .notifyCoworkingCreated({
        name: saved.name,
        phone: saved.phone,
        email: saved.email,
        startAt: saved.startAt.toISOString(),
        endAt: saved.endAt.toISOString(),
        seatLabel: saved.seatLabel,
        id: saved.id,
      })
      .catch((err) =>
        this.logger.warn(
          `Notification failed for coworking ${saved.id}: ${err}`,
        ),
      );

    return saved;
  }

  async findAll(): Promise<CoworkingReservation[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}
