import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SubscriptionPlanModule } from './modules/subscription_plan/subscription_plan.module';
import { UserSubscriptionModule } from './modules/user_subscription/user_subscription.module';
import { PymentModule } from './modules/pyment/pyment.module';
import { MoviyModule } from './modules/movies/moviy.module';
import { MovieCategoriesModule } from './modules/movie_categories/movie_categories.module';
import { MovieFilesModule } from './modules/movie_files/movie_files.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ReviwsModule } from './modules/reviws/reviws.module';
import { WatchHistoryModule } from './modules/watch_history/watch_history.module';
import { RedisModule } from './common/config/redis/redis.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './common/models/user.models';
import { Profile } from './common/models/profile.models';
import { Categories } from './common/models/categories.models';
import { SubscriptionPlans } from './common/models/subscription_plans.models';
import { UserSubscriptions } from './common/models/user_subscriptions.models';
import { Payments } from './common/models/payments.models';
import { Movies } from './common/models/movies.models';
import { MovieCategories } from './common/models/movie_categories.models';
import { MovieFiles } from './common/models/movie_files.models';
import { Favorites } from './common/models/favorites.models';
import { Rewievs } from './common/models/reviews.models';
import { WatchHistory } from './common/models/watch_history.models';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './modules/category/category.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ((configService: ConfigService) => ({
        dialect:  'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: +configService.get('DB_PORT') || 5432,
        username: configService.get( 'DB_USERNAME') || 'postgers',
        password: configService.get('DB_PASSWORD') || 'admin',
        database: configService.get('DB_DATABASE') || 'movies',
        models: [
          User, 
          Profile, 
          Categories, 
          SubscriptionPlans, 
          UserSubscriptions, 
          Payments, 
          Movies, 
          MovieCategories, 
          MovieFiles, 
          Favorites, 
          Rewievs, 
          WatchHistory
        ],
        autoLoadModels: true,
        synchronize: true,
      }))
    }),
    AuthModule, 
    UserModule, 
    ProfileModule, 
    SubscriptionPlanModule, 
    UserSubscriptionModule, 
    PymentModule, 
    MoviyModule, 
    MovieCategoriesModule,
    MovieFilesModule, 
    FavoritesModule, 
    ReviwsModule, 
    WatchHistoryModule, 
    RedisModule, 
    CategoryModule
  ]
})
export class AppModule {}
