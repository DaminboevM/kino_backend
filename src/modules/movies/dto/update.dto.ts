import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { SubscriptionType } from 'src/core/type/types';

export class UpdateMovieDto {

  @ApiProperty()
  @IsUUID()  
  @IsNotEmpty()
  id: string
  
  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  slug?: string

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  release_year?: number

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  duration_minutes?: number

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  @Min(0)
  @Max(99)
  rating?: number

  @ApiProperty({required: false})
  @IsEnum(SubscriptionType)
  @IsOptional()
  subscription_type?: SubscriptionType
}