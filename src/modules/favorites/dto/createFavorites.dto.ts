import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class CrateFavoritesDto {

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    movie_id: string

}