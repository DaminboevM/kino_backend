import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'


export class LoginDto {

    @ApiProperty({example: 'Muhammadrizo'})
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({example: '12345678'})
    @IsString()
    @MinLength(6)
    @MaxLength(22)
    @IsNotEmpty()
    password: string

}