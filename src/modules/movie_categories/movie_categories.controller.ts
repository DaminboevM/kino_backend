import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MovieCategoriesService } from './movie_categories.service';
import { CreateMovieCategoryDto } from './dto/createMovieCategory';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorator/role.decorator';
import { UserRole } from 'src/core/type/types';

@Controller('movie-categories')
export class MovieCategoriesController {
    constructor (private readonly movieCategory: MovieCategoriesService) {}

    @Get()
    getAll () {
        return this.movieCategory.getAll()
    }

    
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @Post('create')
    create (@Body() payload: CreateMovieCategoryDto) {
        return this.movieCategory.create(payload)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.movieCategory.delete(id)
    }
}
