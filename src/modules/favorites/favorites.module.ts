import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorites } from 'src/common/models/favorites.models';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { User } from 'src/common/models/user.models';
import { Movies } from 'src/common/models/movies.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [SequelizeModule.forFeature([Favorites, User, Movies]), JwtModule],
    providers: [FavoritesService],
    controllers: [FavoritesController]
})
export class FavoritesModule {}
