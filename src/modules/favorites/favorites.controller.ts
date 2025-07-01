import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CrateFavoritesDto } from './dto/createFavorites.dto';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ParamDto } from './dto/param.dto';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hamma davoritesni olish' })
  async getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('one')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ID orqali bitta favoritesni olish' })
  async getFavorite(@Req() req: Request) {
    return this.favoritesService.getFavorit(req['user'].id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi favorites qoshish' })
  @ApiBody({ type: CrateFavoritesDto })
  create(@Body() payload: CrateFavoritesDto, @Req() req: Request) {
    const id = req['user'].id;
    return this.favoritesService.create(payload, id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ID orqali favoritesni ochirish' })
  @ApiParam({ name: 'id', type: 'string', description: 'Sevimli IDsi' })
  delete(@Param('id') id: string) {
    return this.favoritesService.delete(id);
  }
}
