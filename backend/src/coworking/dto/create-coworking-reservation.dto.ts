import {
  IsString,
  IsOptional,
  Length,
  Matches,
  IsEmail,
  IsISO8601,
} from 'class-validator';

export class CreateCoworkingReservationDto {
  @IsString()
  @Length(2, 200)
  name!: string;

  @IsString()
  @Length(5, 50)
  @Matches(/^[\d\s+()-]+$/, {
    message: 'phone must contain digits and allowed phone characters',
  })
  phone!: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 320)
  email?: string;

  /** ISO 8601 datetime */
  @IsISO8601()
  startAt!: string;

  @IsISO8601()
  endAt!: string;

  @IsOptional()
  @IsString()
  @Length(1, 80)
  seatLabel?: string;

  @IsOptional()
  @IsString()
  @Length(0, 2000)
  notes?: string;
}
