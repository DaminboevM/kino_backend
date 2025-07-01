import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WatchHistory } from 'src/common/models/watch_history.models';
import { CreateWatchHistoryDto } from './dto/createWatchHistory.dto';
import { Movies } from 'src/common/models/movies.models';
import { UpdateWatchHistoryDto } from './dto/updateWatchHistory.dto';
import { User } from 'src/common/models/user.models';

@Injectable()
export class WatchHistoryService {
    constructor(
        @InjectModel(WatchHistory) private readonly watchHistoryModel: typeof WatchHistory,
        @InjectModel(Movies) private readonly movieModel: typeof Movies,
        @InjectModel(User) private readonly userModel: typeof User
    ) {}

    async getAll () {
        return this.watchHistoryModel.findAll({include: {all: true}})
    }

    
    async getOne (id: string) {
        return this.watchHistoryModel.findByPk(id)
    }


    async create (payload: CreateWatchHistoryDto, id: string) {
        const movie = await this.movieModel.findByPk(payload.movie_id)
        if(!movie) throw new NotFoundException('movie not found !')
        
        const user = await this.userModel.findOne({where: {id}}) 
        if(!user) throw new NotFoundException('user not found !')

        await this.watchHistoryModel.create({...payload, user_id: id})
        return { message: 'watch-history succes created !'}
    }


    async update(payload: UpdateWatchHistoryDto, id: string) {
        const watch_hostory = await this.watchHistoryModel.findByPk(payload.watch_history_id)
        if(!watch_hostory) throw new NotFoundException('watch-history not found !')
        
        if(payload.movie_id) {
            const movie = await this.watchHistoryModel.findByPk(payload.movie_id)
            if(movie) throw new NotFoundException('movie not found !')
        }

        await watch_hostory.update(payload)
        return { message: 'watch-history succes updated !'}
    }

    
}
