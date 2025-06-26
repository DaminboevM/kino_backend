import { IsEmail } from 'class-validator'

export class SendVerifyDto {
    @IsEmail()
    email: string
}