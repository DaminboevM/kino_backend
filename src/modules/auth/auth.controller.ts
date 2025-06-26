import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { VerificationDto } from './dto/verifiycation.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { SendVerifyDto } from './dto/send-verify.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}


    @Post('register')
    register(@Body() payload: RegisterDto) {
        return this.authService.register(payload)
    }


    @Post('verification')
    verification(@Body() payload: VerificationDto) {
        return this.authService.verification(payload)
    }


    @Post('login')
    login(@Body() payload: LoginDto) {
        return this.authService.login(payload)
    }


    @Post('refresh-token')
    refreshToken(@Body() token:TokenDto) {
        return this.authService.refreshToken(token)
    }


    @Post('send-verify')
    sendverify(@Body() payload: SendVerifyDto) {
        return this.authService.sendverify(payload)
    }

    
    @Put(`reset-password`)
    resetPassword(@Body() payload: ResetPasswordDto) {
        return this.authService.resetPassword(payload)
    }
}