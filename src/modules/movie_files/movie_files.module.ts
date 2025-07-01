import { Module } from '@nestjs/common';
import { MovieFilesController } from './movie_files.controller';
import { MovieFilesService } from './movie_files.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieFiles } from 'src/common/models/movie_files.models';
import { Movies } from 'src/common/models/movies.models';
import { JwtModule } from '@nestjs/jwt';
import { WatchHistory } from 'src/common/models/watch_history.models';
import { UserSubscriptions } from 'src/common/models/user_subscriptions.models';

@Module({
  imports: [SequelizeModule.forFeature([MovieFiles, Movies, WatchHistory, UserSubscriptions]), JwtModule],
  controllers: [MovieFilesController],
  providers: [MovieFilesService]
})
export class MovieFilesModule {}
