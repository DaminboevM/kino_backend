import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorites } from 'src/common/models/favorites.models';
import { CrateFavoritesDto } from './dto/createFavorites.dto';
import { User } from 'src/common/models/user.models';
import { Movies } from 'src/common/models/movies.models';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectModel(Favorites) private readonly favoriteModel: typeof Favorites,
        @InjectModel(User) private readonly userModel: typeof User,
        @InjectModel(Movies) private readonly movieModel: typeof Movies
    ) {}

    async getAllFavorites () {
        return this.favoriteModel.findAll()
    }

    
    async getFavorit (id: string) {
        const data = await this.favoriteModel.findOne({where: {id}})
        return data
    }


    async create (payload: CrateFavoritesDto, id: string) {
        const data = await this.userModel.findByPk(id)
        if(!data) throw new NotFoundException('user not found !')
        
        const movie = await this.movieModel.findByPk(payload.movie_id)
        if(!movie) throw new NotFoundException('movie not found !')

        await this.favoriteModel.create({...payload, user_id: id})
        
        return {message: 'favorite succesfull created !'}
    }
    

    async delete (id: string) {
        const data = await this.favoriteModel.findByPk(id)
        if(!data) throw new NotFoundException('favorite not found !')
        
        await this.favoriteModel.destroy({where: {id}})
        return {message: 'favorite succesfull deleted'}

    }
}
