import { Body, Controller, Delete, Get, Param, Post, UseGuards, } from '@nestjs/common';
import { MovieCategoriesService } from './movie_categories.service';
import { CreateMovieCategoryDto } from './dto/createMovieCategory';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorator/role.decorator';
import { UserRole } from 'src/core/type/types';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('movie-categories')
@Controller('movie-categories')
export class MovieCategoriesController {
  constructor(private readonly movieCategory: MovieCategoriesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Barcha kino-kategoriyalarni olish' })
  getAll() {
    return this.movieCategory.getAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'kino_categoryasini yaratish' })
  @ApiBody({ type: CreateMovieCategoryDto })
  create(@Body() payload: CreateMovieCategoryDto) {
    return this.movieCategory.create(payload);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'kino_categorynai ID orqali ochirish' })
  @ApiParam({ name: 'id', type: 'string', description: 'Movie-Category IDsi' })
  delete(@Param('id') id: string) {
    return this.movieCategory.delete(id);
  }
}
