import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieFileDto } from './dto/create.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MovieFiles } from 'src/common/models/movie_files.models';
import { Movies } from 'src/common/models/movies.models';
import { Status, SubscriptionType } from 'src/core/type/types';
import { UserSubscriptions } from 'src/common/models/user_subscriptions.models';
import { WatchHistory } from 'src/common/models/watch_history.models';

@Injectable()
export class MovieFilesService {
    constructor(
        @InjectModel(MovieFiles) private readonly movieFileModel: typeof MovieFiles,
        @InjectModel(Movies) private readonly movieModel: typeof Movies,
        @InjectModel(UserSubscriptions) private readonly userSubscription: typeof UserSubscriptions,
        @InjectModel(WatchHistory) private readonly watchistorymodel: typeof WatchHistory,
) {}

    
    async create (payload: CreateMovieFileDto, file: Express.Multer.File) {
        const movie = await this.movieModel.findOne({where: {id: payload.movie_id}})
        if (!movie) throw new NotFoundException('movie spesific id not found')

        const size = parseFloat((file.size / (1024 * 1024)).toFixed(2))
        await this.movieFileModel.create({...payload, file_url: file.path, size })

        return { success: true, message: 'moive file succes crated !' }
    }

    async getAll () {
        return this.movieFileModel.findAll({include: {all: true}})
    }


    async getOne(file_id : string, user_id: string) {
        let file : MovieFiles | null = await this.movieFileModel.findOne({
            where : {id : file_id},
            include : [
                {
                    model : Movies,
                    attributes: ['subscription_type', 'id']
                }
            ]
        })
        
        if(!file) throw new NotFoundException('movie id not found !')
        file = file.toJSON()

        const movie = await this.movieModel.findByPk(file?.movie.id)
        if(!movie) throw new NotFoundException('movie not found !')

        movie.view_count += 1
        movie.save()

        const user = await this.userSubscription.findOne({where: {user_id}})
        if(!user) throw new NotFoundException('user_id not found !')
            
        const w_payload = {
            move_id: file?.movie.id,
            user_id: user_id,
            watched_duration: 0,
            watched_percentage: 0,
            last_watched: new Date().toISOString()
        }
            
        const w_h = await this.watchistorymodel.findOne({where: {user_id: user_id}})

        if(w_h) await w_h.update({...w_payload})
        else await this.watchistorymodel.create({...w_payload})

        if(user.status == Status.active || movie.subscription_type == SubscriptionType.free) return file
        return {message: 'you are not allowed !'}
        
    }
}
