import { Module } from '@nestjs/common';
import { PymentController } from './pyment.controller';
import { PymentService } from './pyment.service';

@Module({
  controllers: [PymentController],
  providers: [PymentService]
})
export class PymentModule {}
