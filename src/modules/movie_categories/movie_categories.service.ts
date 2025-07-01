import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MovieCategories } from 'src/common/models/movie_categories.models';
import { CreateMovieCategoryDto } from './dto/createMovieCategory';
import { Movies } from 'src/common/models/movies.models';
import { Categories } from 'src/common/models/categories.models';

@Injectable()
export class MovieCategoriesService {
    constructor(
        @InjectModel(MovieCategories) private readonly movieCategoryModel: typeof MovieCategories,
        @InjectModel(Movies) private readonly movieModel: typeof Movies,
        @InjectModel(Categories) private readonly categoryModel: typeof Categories
    ) {}

    async getAll () {
        return this.movieCategoryModel.findAll({include: [{model: Categories}, {model: Movies}]})
    }


    async create (payload: CreateMovieCategoryDto) {
        const movie = await this.movieModel.findByPk(payload.movie_id)
        if(!movie) throw new NotFoundException('movie not found !')

        const category = await this.categoryModel.findByPk(payload.category_id)
        if(!category) throw new NotFoundException('category not found !')
        
        await this.movieCategoryModel.create(payload as any)
        return { message: 'movie_category succes created !!'}
    }


    async delete (id: string) {
        const data = await this.movieCategoryModel.findByPk(id)
        if(!data) throw new NotFoundException('movieCategory not found !')
        
        await this.movieCategoryModel.destroy({where: {id}})
        return {message: 'movieCategory succes deleted !'}
    }
}
