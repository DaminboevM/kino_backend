import { IsArray, IsBoolean, IsDecimal, IsJSON, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSubscriptionPlansDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsDecimal({ decimal_digits: '2', force_decimal: true })
    price: string;

    @IsNumber()
    @IsNotEmpty()
    duration_days: number

    @IsArray()
    @IsNotEmpty()
    features: string
}