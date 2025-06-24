import { Module } from '@nestjs/common';
import { MovieFilesController } from './movie_files.controller';
import { MovieFilesService } from './movie_files.service';

@Module({
  controllers: [MovieFilesController],
  providers: [MovieFilesService]
})
export class MovieFilesModule {}
