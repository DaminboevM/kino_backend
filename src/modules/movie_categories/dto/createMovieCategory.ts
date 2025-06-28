import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateMovieCategoryDto {

    @IsNotEmpty()
    @IsUUID()
    movie_id: string

    @IsNotEmpty()
    @IsUUID()
    category_id: string
}