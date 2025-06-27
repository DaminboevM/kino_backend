import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}


    async canActivate (context: ExecutionContext,): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        let token = this.CheckToken(request);

        if (!token) throw new UnauthorizedException()

        try {
            let payload = await this.jwtService.verifyAsync(token)
            request['user'] = payload
            return true
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
    
    
    private CheckToken(request: Request): string | undefined{
        let [type,token] = request.headers.authorization?.split(" ") || []
        return type == "Bearer" ? token : undefined
    }
}