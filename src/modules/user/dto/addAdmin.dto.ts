import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, IsEnum } from 'class-validator'
import { UserRole } from 'src/core/type/types'


export class AddAdminDto {
    
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

    @IsString()
    @IsEnum(UserRole)
    role: string
}