import { Module } from '@nestjs/common';
import { MoviyController } from './moviy.controller';
import { MoviyService } from './moviy.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movies } from 'src/common/models/movies.models';
import { User } from 'src/common/models/user.models';
import { JwtModule } from '@nestjs/jwt';
import { MovieCategories } from 'src/common/models/movie_categories.models';

@Module({
  imports: [SequelizeModule.forFeature([Movies, User, MovieCategories]), JwtModule],
  controllers: [MoviyController],
  providers: [MoviyService]
})
export class MoviyModule {}
