import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'
import { VerificationDto } from './verifiycation.dto'
import { ApiProperty } from '@nestjs/swagger'


export class ResetPasswordDto extends VerificationDto {
    
    @ApiProperty({example: '12345678'})
    @IsString()
    @MinLength(6)
    @MaxLength(22)
    @IsNotEmpty()
    password: string
}