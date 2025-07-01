import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movies } from 'src/common/models/movies.models';
import { WatchHistory } from 'src/common/models/watch_history.models';
import { WatchHistoryService } from './watch_history.service';
import { WatchHistoryController } from './watch_history.controller';
import { User } from 'src/common/models/user.models';

@Module({
    imports: [SequelizeModule.forFeature([WatchHistory, Movies, User]), JwtModule],
    providers: [WatchHistoryService],
    controllers: [WatchHistoryController]
})
export class WatchHistoryModule {}
