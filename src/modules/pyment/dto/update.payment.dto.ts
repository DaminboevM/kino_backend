import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdatepaymentDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    payment_id: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amount: number
}