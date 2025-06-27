import { IsNotEmpty, IsUUID } from "class-validator"

export class CrateFavoritesDto {

    @IsUUID()
    @IsNotEmpty()
    movie_id: string

}