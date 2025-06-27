import { IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class UpdateMovieDto {

  
  @IsUUID()  
  @IsNotEmpty()
  id: string
  
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  release_year?: number;

  @IsOptional()
  @IsString()
  duration_minutes?: number;

  @IsOptional()
  @IsString()
  @Min(0)
  @Max(99)
  rating?: number;
}