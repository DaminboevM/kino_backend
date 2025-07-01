import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, IsEnum } from 'class-validator'
import { UserRole } from 'src/core/type/types'


export class AddAdminDto {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string
    
    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(22)
    @IsNotEmpty()
    password: string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({enum: UserRole})
    @IsString()
    @IsEnum(UserRole)
    role: string
}