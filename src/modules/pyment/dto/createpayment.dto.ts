import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsNumber, IsJSON } from 'class-validator';
import { PaymentMethod, Status } from 'src/core/type/types';


export class CreatePaymentDto {
    
    @ApiProperty()
    @IsUUID()
    user_subscription_id: string
    
    @ApiProperty()
    @IsNumber()
    amount: number
    
    @ApiProperty({enum: PaymentMethod})
    @IsEnum(PaymentMethod)
    payment_method: PaymentMethod
    
    @ApiProperty()
    @IsJSON()
    payment_details: string
    
}
