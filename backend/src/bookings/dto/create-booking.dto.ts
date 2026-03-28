import {
  IsString,
  IsOptional,
  Length,
  Matches,
  IsDateString,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @Length(2, 200)
  guestName!: string;

  @IsString()
  @Length(5, 50)
  @Matches(/^[\d\s+()-]+$/, {
    message: 'phone must contain digits and allowed phone characters',
  })
  phone!: string;

  @IsDateString()
  checkIn!: string;

  @IsDateString()
  checkOut!: string;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  notes?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  roomType?: string;
}
