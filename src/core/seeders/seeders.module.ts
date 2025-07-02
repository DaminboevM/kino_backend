import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/common/models/user.models';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [SeedersService],
  exports: [SeedersService]
})

export class SeedersModule {}
