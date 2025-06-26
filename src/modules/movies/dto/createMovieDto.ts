import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMovieDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    slug: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    release_year: number

    @IsNotEmpty()
    @IsNumber()
    duration_minutes: number

    @IsNotEmpty()
    @IsNumber()
    rating: number
}