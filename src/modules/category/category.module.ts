import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categories } from 'src/common/models/categories.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Categories]), JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
