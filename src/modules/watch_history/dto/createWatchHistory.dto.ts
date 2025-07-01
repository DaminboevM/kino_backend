import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateWatchHistoryDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    watched_duration: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    watched_percentage: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()    
    movie_id: string
}