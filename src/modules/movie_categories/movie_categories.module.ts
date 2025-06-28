import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categories } from 'src/common/models/categories.models';
import { MovieCategories } from 'src/common/models/movie_categories.models';
import { Movies } from 'src/common/models/movies.models';
import { MovieCategoriesService } from './movie_categories.service';
import { MovieCategoriesController } from './movie_categories.controller';

@Module({
    imports: [SequelizeModule.forFeature([MovieCategories, Movies, Categories]), JwtModule],
    providers: [MovieCategoriesService],
    controllers: [MovieCategoriesController]
})
export class MovieCategoriesModule {}
