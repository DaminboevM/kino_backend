import { Module } from '@nestjs/common';
import { MoviyController } from './moviy.controller';
import { MoviyService } from './moviy.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movies } from 'src/common/models/movies.models';
import { User } from 'src/common/models/user.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Movies, User]), JwtModule],
  controllers: [MoviyController],
  providers: [MoviyService]
})
export class MoviyModule {}
