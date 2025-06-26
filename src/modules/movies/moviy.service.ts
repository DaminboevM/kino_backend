import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movies } from 'src/common/models/movies.models';
import { CreateMovieDto } from './dto/createMovieDto';

@Injectable()
export class MoviyService {
    constructor(@InjectModel(Movies) private movieModel: typeof Movies) {}

    async create (id: string, payload: CreateMovieDto, poster: string) {
        const data = await this.movieModel.create({...payload, user_id: id, poster_url: poster})

        return { message: 'movie succesfull created !' }
    }
}
