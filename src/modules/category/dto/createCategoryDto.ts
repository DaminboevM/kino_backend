import { IsNotEmpty, IsString } from "class-validator"

export class CreateCategoryDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    slug: string

    @IsNotEmpty()
    @IsString()
    description: string
}