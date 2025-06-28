import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";



export class CreateReviewDto{
    
    @IsString()
    @IsNotEmpty()
    movie_id: string

    @IsNumber()
    @Min(1)
    @Max(10)
    @IsNotEmpty()
    rating: number

    @IsString()
    @IsNotEmpty()
    comment: string
}