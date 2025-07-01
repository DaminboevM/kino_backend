import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { SubscriptionType } from "src/core/type/types";

export class CreateMovieDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    slug: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    release_year: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    duration_minutes: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    rating: number

    @ApiProperty({enum: SubscriptionType})
    @IsEnum(SubscriptionType)
    @IsNotEmpty()
    subscription_type: SubscriptionType

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    category_id: string
}