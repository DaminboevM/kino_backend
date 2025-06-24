import { Module } from '@nestjs/common';
import { ReviwsController } from './reviws.controller';
import { ReviwsService } from './reviws.service';

@Module({
  controllers: [ReviwsController],
  providers: [ReviwsService]
})
export class ReviwsModule {}
