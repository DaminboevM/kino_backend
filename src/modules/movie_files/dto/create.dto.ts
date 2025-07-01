import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { Language, Quality } from "src/core/type/types";

export class CreateMovieFileDto {

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    movie_id: string;

    @IsOptional()
    @ApiProperty({format: 'binary'})
    video?: string

    @ApiProperty({ enum: Quality, example: Quality["360p"] })
    @IsNotEmpty()
    @IsEnum(Quality)
    quality: Quality;

    @ApiProperty({ enum: Language, example: Language.UZ })
    @IsNotEmpty()
    @IsEnum(Language)
    language: Language;
}
