import { ApiProperty } from "@nestjs/swagger";
import { IsJSON,  IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateSubscriptionPlansDto {

    @ApiProperty()
    @IsUUID()
    id: string

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty({required: false})
    @IsNumber()
    @IsOptional()
    duration_days?: number

    @ApiProperty({required: false})
    @IsJSON()
    @IsOptional()
    features?: JSON
}