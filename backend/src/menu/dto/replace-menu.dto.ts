import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

export class MenuItemDto {
  @IsString()
  @Length(1, 80)
  id!: string;

  @IsString()
  @Length(1, 200)
  name!: string;

  @IsString()
  @MaxLength(2000)
  description!: string;

  @IsString()
  @Length(1, 100)
  price!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}

export class MenuCategoryDto {
  @IsString()
  @Length(1, 80)
  slug!: string;

  @IsString()
  @Length(1, 200)
  title!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuItemDto)
  items!: MenuItemDto[];
}

export class ReplaceMenuDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MenuCategoryDto)
  categories!: MenuCategoryDto[];
}
