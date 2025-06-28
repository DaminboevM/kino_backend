import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movies } from 'src/common/models/movies.models';
import { Rewievs } from 'src/common/models/reviews.models';
import { User } from 'src/common/models/user.models';
import { CreateReviewDto } from './dto/createReview.dto';


@Injectable()
export class ReviwsService {
    constructor(
        @InjectModel(Rewievs) private readonly reviewsModel: typeof Rewievs,
        @InjectModel(Movies) private readonly movieModel: typeof Movies,
        @InjectModel(User) private readonly userModel: typeof User
    ) {}

    async getAll () {
        return this.reviewsModel.findAll({include: [{model: User}, {model: Movies}]})
    }


    async create (user_id: string, payload: CreateReviewDto) {
        const movie = await this.movieModel.findByPk(payload.movie_id)
        if(!movie) throw new NotFoundException('movie not found !')

        const user = await this.userModel.findByPk(user_id)
        if(!user) throw new NotFoundException('user not found !')

        await this.reviewsModel.create({...payload, user_id})
        return { message: 'reviews succesfull created !' }
                
    }

    async delete (id: string) {
        const data = await this.reviewsModel.findByPk(id)
        if(!data) throw new NotFoundException('revews not found !')
        
        await this.reviewsModel.destroy({where: {id}})
        return {message: 'reviews succesfull deleted !'}
    }
}
