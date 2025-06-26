import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'
import { VerificationDto } from './verifiycation.dto'


export class ResetPasswordDto extends VerificationDto {
    @IsString()
    @MinLength(6)
    @MaxLength(22)
    @IsNotEmpty()
    password: string
}