import { IsNotEmpty, IsJWT, } from 'class-validator'


export class TokenDto {

    @IsJWT()
    @IsNotEmpty()
    token: string
}