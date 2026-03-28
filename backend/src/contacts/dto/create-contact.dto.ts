import { IsString, IsOptional, Length, IsEmail, Matches } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @Length(2, 200)
  name!: string;

  @IsEmail()
  @Length(1, 320)
  email!: string;

  @IsOptional()
  @IsString()
  @Length(5, 50)
  @Matches(/^[\d\s+()-]+$/, {
    message: 'phone must contain digits and allowed phone characters',
  })
  phone?: string;

  @IsString()
  @Length(1, 5000)
  message!: string;

  @IsOptional()
  @IsString()
  @Length(1, 80)
  source?: string;
}
