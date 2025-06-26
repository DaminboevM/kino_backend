import { IsEmail, IsNumber } from 'class-validator'


export class VerificationDto {

    @IsEmail()
    email: string

    @IsNumber()
    code: number
}