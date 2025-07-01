import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class UpdateCategoryDto {

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    id: string

    @ApiProperty({required: false})
    @IsString()
    name?: string

    @ApiProperty({required: false})
    @IsString()
    slug?: string

    @ApiProperty({required: false})
    @IsString()
    description?: string
}