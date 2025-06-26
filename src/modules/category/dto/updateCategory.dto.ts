import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class UpdateCategoryDto {

    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    name?: string

    @IsString()
    slug?: string

    @IsString()
    description?: string
}