import { Module } from '@nestjs/common';
import { ReviwsController } from './reviws.controller';
import { ReviwsService } from './reviws.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rewievs } from 'src/common/models/reviews.models';
import { Movies } from 'src/common/models/movies.models';
import { User } from 'src/common/models/user.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Rewievs, Movies, User]), JwtModule],
  controllers: [ReviwsController],
  providers: [ReviwsService]
})
export class ReviwsModule {}
