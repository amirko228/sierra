import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);

  constructor(
    @InjectRepository(Contact)
    private readonly repo: Repository<Contact>,
    private readonly notifications: NotificationsService,
  ) {}

  async create(dto: CreateContactDto): Promise<Contact> {
    const entity = this.repo.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      message: dto.message,
      source: dto.source ?? 'website',
    });
    const saved = await this.repo.save(entity);

    void this.notifications
      .notifyLeadCreated({
        name: saved.name,
        email: saved.email,
        phone: saved.phone,
        message: saved.message,
        id: saved.id,
      })
      .catch((err) =>
        this.logger.warn(`Notification failed for contact ${saved.id}: ${err}`),
      );

    return saved;
  }

  async findAll(): Promise<Contact[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}
