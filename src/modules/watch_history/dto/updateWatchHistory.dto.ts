import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateWatchHistoryDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    watch_history_id: string

    @ApiProperty({required: false})
    @IsNumber()
    @IsOptional()
    watched_duration?: number

    @ApiProperty({required: false})
    @IsNumber()
    @IsOptional()
    watched_percentage?: number

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()    
    movie_id?: string
}