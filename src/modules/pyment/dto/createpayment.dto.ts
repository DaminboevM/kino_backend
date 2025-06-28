import { IsUUID, IsEnum, IsNumber, IsJSON, IsOptional, IsString } from 'class-validator';
import { PaymentMethod, Status } from 'src/core/type/types';


export class CreatePaymentDto {
    
    @IsUUID()
    user_subscription_id: string
    
    @IsNumber()
    amount: number
    
    @IsEnum(PaymentMethod)
    payment_method: PaymentMethod
    
    @IsJSON()
    payment_details: object
    
    @IsEnum(Status)
    status: Status
    
    @IsOptional()
    @IsString()
    external_transaction_id?: string
}





