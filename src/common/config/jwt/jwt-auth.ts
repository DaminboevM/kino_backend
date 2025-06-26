import { JwtSignOptions } from '@nestjs/jwt'


export const JwtAccsesToken:  JwtSignOptions = {
    secret: 'qwertyuiop',
    expiresIn: '20m'
}

export const JwtRefreshToken: JwtSignOptions = {
    secret: 'qwertyuiop',
    expiresIn: '7d'
}