import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'


export class LoginDto {


    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @MinLength(6)
    @MaxLength(22)
    @IsNotEmpty()
    password: string

}