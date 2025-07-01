import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDecimal, IsJSON, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSubscriptionPlansDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    duration_days: number

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    features: string
}