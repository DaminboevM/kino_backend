import { IsNotEmpty, IsString } from "class-validator";

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
    @IsString()
    release_year: number

    @IsNotEmpty()
    @IsString()
    duration_minutes: number

    @IsNotEmpty()
    @IsString()
    rating: number
}