import { Body, Controller, Post } from '@nestjs/common';
import { CoworkingService } from './coworking.service';
import { CreateCoworkingReservationDto } from './dto/create-coworking-reservation.dto';

@Controller('coworking')
export class CoworkingController {
  constructor(private readonly coworkingService: CoworkingService) {}

  @Post('reservations')
  create(@Body() dto: CreateCoworkingReservationDto) {
    return this.coworkingService.create(dto);
  }
}
