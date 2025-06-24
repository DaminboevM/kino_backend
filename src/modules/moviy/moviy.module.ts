import { Module } from '@nestjs/common';
import { MoviyController } from './moviy.controller';
import { MoviyService } from './moviy.service';

@Module({
  controllers: [MoviyController],
  providers: [MoviyService]
})
export class MoviyModule {}
