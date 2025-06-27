import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movies } from 'src/common/models/movies.models';
import { CreateMovieDto } from './dto/createMovieDto';
import { User } from 'src/common/models/user.models';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class MoviyService {
    constructor( 
        @InjectModel(Movies) private readonly movieModel: typeof Movies, 
        @InjectModel(User) private readonly userModel: typeof User
    ) {}


    async getAll () {
        return this.movieModel.findAll()
    }


    getOneMovy(id: string) {
        return this.movieModel.findByPk(id)
    }


    async create (id: string, payload: CreateMovieDto, poster: string) {
        const data = await this.movieModel.findOne({where: {slug: payload.slug}})
        if(data) throw new ConflictException('slug alredy exsits !')

        const user = await this.userModel.findByPk(id)
        if(!user) throw new ConflictException('User not found !')
        await this.movieModel.create({...payload, created_by: id, poster_url: poster})

        return { message: 'movie succesfull created !' }
    }


    async update(id: string, payload: Required<CreateMovieDto>, filename?: string) {
        const data = await this.movieModel.findByPk(id)
        if(!data) throw new NotFoundException('moviy not found !')
        
        const filePath = join( process.cwd(), 'uploads', 'posters',data.poster_url);
        if(existsSync(filePath))  unlinkSync(filePath);
        if(filename) data.poster_url = filename

        await data.update(payload)
        await data.save()
        return { message: 'movie succesfull updated'};
    }


    async delete (id: string) {
        const data = await this.movieModel.findByPk(id)
        if(!data) throw new NotFoundException('Moviy not found !')

        const filePath = join(process.cwd(), 'uploads', 'posters', data.dataValues.poster_url);
        if (existsSync(filePath)) unlinkSync(filePath);
    
        await this.movieModel.destroy({where: { id }})
        return {message: 'movie succes deleted !'}
    }
}
