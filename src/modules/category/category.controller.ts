import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @Get()
    async getAllOrBySlug(@Query('slug') slug?: string) {
        return this.categoryService.get(slug)
    }

    @Post('create')
    async createCategory (@Body() payload: CreateCategoryDto) {
        return this.categoryService.create(payload)
    }

    @Put('update')
    async updateCategory (@Body() payload: Required<UpdateCategoryDto>) {
        return this.categoryService.update(payload)
    }

    @Delete(':id')
    async deleteCategory (@Param('id') id: string) {
        return this.categoryService.delete(id)
    }

}
