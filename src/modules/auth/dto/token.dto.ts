import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsJWT, } from 'class-validator'


export class TokenDto {

    @ApiProperty()
    @IsJWT()
    @IsNotEmpty()
    token: string
}