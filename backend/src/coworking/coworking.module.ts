import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoworkingReservation } from './entities/coworking-reservation.entity';
import { CoworkingService } from './coworking.service';
import { CoworkingController } from './coworking.controller';
@Module({
  imports: [TypeOrmModule.forFeature([CoworkingReservation])],
  controllers: [CoworkingController],
  providers: [CoworkingService],
  exports: [CoworkingService],
})
export class CoworkingModule {}
