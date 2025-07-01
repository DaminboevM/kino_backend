import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movies } from 'src/common/models/movies.models';
import { CreateMovieDto } from './dto/createMovieDto';
import { User } from 'src/common/models/user.models';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { MoveQueryDto } from './dto/qeury.dto';
import { Op } from 'sequelize';
import { Categories } from 'src/common/models/categories.models';
import { MovieCategories } from 'src/common/models/movie_categories.models';
import { UpdateMovieDto } from './dto/update.dto';


@Injectable()
export class MoviyService {
    constructor(
        @InjectModel(Movies) private readonly movieModel: typeof Movies,
        @InjectModel(User) private readonly userModel: typeof User,
        @InjectModel(MovieCategories) private readonly movieCatwgories: typeof MovieCategories
    ) { }


    async getAll(query: MoveQueryDto) {
        let where = {}
        let limit = query.limit ? query.limit : 10
        let offset = query.page ? (query.page - 1) * limit : 0
        const include = [
            {
                model: MovieCategories,
                include: [
                    {
                        model: Categories,
                        attributes: ['id', 'name'],
                        ...(query.category && {
                            where: { name: query.category },
                        }),
                    },
                ],
            },
        ]


        query.search && (where['title'] = { [Op.iLike]: `%${query.search}%`.trim() })
        query.subscription_type && (where['subscription_type'] = query.subscription_type)
        query.rating && (where['rating'] = query.rating)
        query.year && (where['release_year'] = query.year)

        const data = await this.movieModel.findAll({
            where,
            offset,
            include,
            limit,
            raw: false
        })

        let total = await this.movieModel.count({ where, include })
        return {
            succes: true,
            data,
            pagination: {
                total,
                page: query.page || 0,
                limit,
                pages: Math.ceil(total / limit)
            }
        }
    }


    async getOneMovy(id: string) {
        return this.movieModel.findOne({ where: { id } })
    }


    async getTopMovies(limit: number = 10) {
        return this.movieModel.findAll({ order: [['view_count', 'DESC']], limit })
    }



    async create(id: string, payload: CreateMovieDto, poster: string) {
        const data = await this.movieModel.findOne({ where: { slug: payload.slug } })
        if (data) throw new ConflictException('slug alredy exsits !')

        const user = await this.userModel.findByPk(id)
        if (!user) throw new ConflictException('User not found !')

        await this.movieModel.create({ ...payload, created_by: id, poster_url: poster })
        return { message: 'movie succesfull created !' }
    }


    async update(payload: UpdateMovieDto, filename?: string) {
        const data = await this.movieModel.findByPk(payload.id)
        if (!data) throw new NotFoundException('moviy not found !')

        if (filename) {
            const filePath = join(process.cwd(), 'uploads', 'posters', data.dataValues.poster_url)
            if (existsSync(filePath)) unlinkSync(filePath)
            await data.update({ poster_url: filename })
        }

        await data.update(payload)
        return { message: 'movie succesfull updated' }
    }


    async delete(id: string) {
        const data = await this.movieModel.findByPk(id)
        if (!data) throw new NotFoundException('Moviy not found !')

        const filePath = join(process.cwd(), 'uploads', 'posters', data.dataValues.poster_url);
        if (existsSync(filePath)) unlinkSync(filePath);

        await data.destroy()
        return { message: 'movie succes deleted !' }
    }
}
