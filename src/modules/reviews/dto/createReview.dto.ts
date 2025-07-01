import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";



export class CreateReviewDto{
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    movie_id: string

    @ApiProperty()
    @IsNumber()
    @Min(1)
    @Max(10)
    @IsNotEmpty()
    rating: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    comment: string
}