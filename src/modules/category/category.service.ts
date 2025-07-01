import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Categories } from 'src/common/models/categories.models';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Categories)  private readonly categoryModel: typeof Categories) {}

    async get (slug?: string) {
        if(slug) {
            const data = await this.categoryModel.findOne({where: {slug}})
            return {message: 'category succsesfull readed', data}
        }
        const data = await this.categoryModel.findAll()
        return data
    }


    async create (payload: CreateCategoryDto) {
        const data = await this.categoryModel.findOne({where: {slug: payload.slug}})
        if(data) throw new ConflictException('category alredy exists !')
        await this.categoryModel.create(payload as any)
        
        return {
            message: 'category succsesfull created !'
        }
    }

    async update (payload: UpdateCategoryDto) {
        const data = await this.categoryModel.findByPk(payload.id)
        if(!data) throw new ConflictException('category not found !')
        await data.update(payload)
        
        return {
            message: 'category succsesfull updated !'
        }
    }

    async delete (id: string) {
        const category = await this.categoryModel.findByPk(id)
        if(!category) throw new NotFoundException('category not found !')
        await this.categoryModel.destroy({where: {id}})
        
        return {
            message: 'category succsesfull deleted !'
        } 
    }
}
