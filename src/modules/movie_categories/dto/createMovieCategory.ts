import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateMovieCategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    movie_id: string

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    category_id: string
}