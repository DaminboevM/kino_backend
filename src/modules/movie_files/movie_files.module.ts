import { Module } from '@nestjs/common';
import { MovieFilesController } from './movie_files.controller';
import { MovieFilesService } from './movie_files.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieFiles } from 'src/common/models/movie_files.models';

@Module({
  imports: [SequelizeModule.forFeature([MovieFiles])],
  controllers: [MovieFilesController],
  providers: [MovieFilesService]
})
export class MovieFilesModule {}
