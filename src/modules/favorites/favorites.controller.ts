import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CrateFavoritesDto } from './dto/createFavorites.dto';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    async getAllFavorites () {
        return this.favoritesService.getAllFavorites()
    }

    
    @UseGuards(AuthGuard, RolesGuard)
    @Get(':id')
    async getFavorite (id: string) {
        return this.favoritesService.getFavorit(id)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Post('create')
    create (@Body() payload: CrateFavoritesDto, @Req() req: Request) {
        const id = req['user'].id
        return this.favoritesService.create(payload, id)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Delete(':id')
    delete (@Param('id') id: string) {
        return this.favoritesService.delete(id)
    }

}
