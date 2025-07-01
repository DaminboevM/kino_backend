import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRole } from 'src/core/type/types';
import { Roles } from 'src/core/decorator/role.decorator';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get()
  @ApiOperation({ summary: 'hamma categoryani yokislug boyicha korish' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'slug', required: false, description: 'Agar slug yuborilsa, shu kategoriya qaytariladi' })
  async getAllOrBySlug(@Query('slug') slug?: string) {
    return this.categoryService.get(slug);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'yangi kategoriya yaratish' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCategoryDto })
  async createCategory(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Put('update')
  @ApiOperation({ summary: 'categoriyani yangilash' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateCategoryDto })
  async updateCategory(@Body() payload: UpdateCategoryDto) {
    return this.categoryService.update(payload);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'categoriyani ID orqali ochirish' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string', description: 'Kategoriya IDsi' })
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
