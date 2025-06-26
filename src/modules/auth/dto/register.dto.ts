import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength } from 'class-validator'


export class RegisterDto {
    
    @IsString()
    @IsNotEmpty()
    username: string
    
    @IsString()
    @MinLength(6)
    @MaxLength(22)
    @IsNotEmpty()
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string
}