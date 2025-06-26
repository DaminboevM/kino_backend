import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/common/models/user.models';
import { MailerModule } from 'src/common/config/mailer/mailer.module';
import { RedisModule } from 'src/common/config/redis/redis.module';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt-auth';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register(JwtAccsesToken),
    MailerModule,
    RedisModule,
  ],
})
export class AuthModule {}
