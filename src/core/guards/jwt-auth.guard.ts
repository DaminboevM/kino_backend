import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt-auth';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}


    async canActivate (context: ExecutionContext,): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        let token = this.CheckToken(request);


        console.log(token);
        
        if (!token) throw new UnauthorizedException("slaom")

        try {
            let payload = await this.jwtService.verifyAsync(token, JwtAccsesToken)
            request['user'] = payload
            
            return true
        } catch (error) {
            console.log(error);
            
            if(error.name === 'TokenExpiredError') throw new UnauthorizedException('token expire !')
            throw new UnauthorizedException('Invalide token !')
        }
    }
    
    
    private CheckToken(request: Request): string | undefined{
        let [type,token] = request.headers.authorization?.split(" ") || []
        return type == "Bearer" ? token : undefined
    }
}