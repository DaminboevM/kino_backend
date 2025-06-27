import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRole } from 'src/core/type/types';
import { Roles } from 'src/core/decorator/role.decorator';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Get()
    async getAllOrBySlug(@Query('slug') slug?: string) {
        return this.categoryService.get(slug)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Post('create')
    async createCategory (@Body() payload: CreateCategoryDto) {
        return this.categoryService.create(payload)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Put('update')
    async updateCategory (@Body() payload: Required<UpdateCategoryDto>) {
        return this.categoryService.update(payload)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Delete(':id')
    async deleteCategory (@Param('id') id: string) {
        return this.categoryService.delete(id)
    }

}
