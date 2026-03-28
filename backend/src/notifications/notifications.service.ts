import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const TELEGRAM_MAX = 4096;

export type BookingPayload = {
  id: string;
  guestName: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
};

export type CoworkingPayload = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  startAt: string;
  endAt: string;
  seatLabel: string;
};

export type LeadPayload = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
};

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly config: ConfigService) {}

  async notifyBookingCreated(payload: BookingPayload): Promise<void> {
    const text = [
      '🏨 Новая бронь Madanur (Sierra Karakol)',
      `ID: ${payload.id}`,
      `Гость: ${payload.guestName}`,
      `Телефон: ${payload.phone}`,
      `Заезд: ${payload.checkIn}`,
      `Выезд: ${payload.checkOut}`,
      `Тип номера: ${payload.roomType}`,
    ].join('\n');
    await this.sendTelegram(text);
  }

  async notifyCoworkingCreated(payload: CoworkingPayload): Promise<void> {
    const text = [
      '💼 Коворкинг: новая резервация',
      `ID: ${payload.id}`,
      `${payload.name} | ${payload.phone}`,
      payload.email ? `Email: ${payload.email}` : '',
      `Место: ${payload.seatLabel}`,
      `Начало: ${payload.startAt}`,
      `Конец: ${payload.endAt}`,
    ]
      .filter(Boolean)
      .join('\n');
    await this.sendTelegram(text);
  }

  async notifyLeadCreated(payload: LeadPayload): Promise<void> {
    const text = [
      '📩 Новый лид с сайта',
      `ID: ${payload.id}`,
      `${payload.name} <${payload.email}>`,
      payload.phone ? `Тел: ${payload.phone}` : '',
      '',
      payload.message.slice(0, 3500),
    ]
      .filter((l) => l !== undefined)
      .join('\n');
    await this.sendTelegram(text);
  }

  private async sendTelegram(text: string): Promise<void> {
    const token = this.config.get<string>('telegram.botToken');
    const chatId = this.config.get<string>('telegram.chatId');
    if (!token || !chatId) {
      this.logger.debug('Telegram не настроен (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID)');
      return;
    }

    const body =
      text.length > TELEGRAM_MAX
        ? `${text.slice(0, TELEGRAM_MAX - 20)}\n… (обрезано)`
        : text;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: body }),
    });
    if (!res.ok) {
      const err = await res.text();
      this.logger.warn(`Telegram error: ${res.status} ${err}`);
    }
  }
}
