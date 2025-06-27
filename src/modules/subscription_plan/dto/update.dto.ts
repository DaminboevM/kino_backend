import { IsBoolean, IsDecimal, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateSubscriptionPlansDto {


    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsOptional()
    name?: string

    @IsDecimal({ decimal_digits: '2', force_decimal: true })
    price?: string;

    @IsNumber()
    @IsOptional()
    duration_days?: number

    @IsJSON()
    @IsOptional()
    features?: JSON
}