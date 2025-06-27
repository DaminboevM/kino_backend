import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Categories } from "src/common/models/categories.models";
import { Favorites } from "src/common/models/favorites.models";
import { MovieCategories } from "src/common/models/movie_categories.models";
import { MovieFiles } from "src/common/models/movie_files.models";
import { Movies } from "src/common/models/movies.models";
import { Payments } from "src/common/models/payments.models";
import { Profile } from "src/common/models/profile.models";
import { Rewievs } from "src/common/models/reviews.models";
import { SubscriptionPlans } from "src/common/models/subscription_plans.models";
import { User } from "src/common/models/user.models";
import { UserSubscriptions } from "src/common/models/user_subscriptions.models";
import { AuthModule } from "src/modules/auth/auth.module";
import { FavoritesModule } from "src/modules/favorites/favorites.module";
import { MovieCategoriesModule } from "src/modules/movie_categories/movie_categories.module";
import { MovieFilesModule } from "src/modules/movie_files/movie_files.module";
import { MoviyModule } from "src/modules/movies/moviy.module";
import { ProfileModule } from "src/modules/profile/profile.module";
import { PymentModule } from "src/modules/pyment/pyment.module";
import { ReviwsModule } from "src/modules/reviws/reviws.module";
import { SubscriptionPlanModule } from "src/modules/subscription_plan/subscription_plan.module";
import { UserModule } from "src/modules/user/user.module";
import { UserSubscriptionModule } from "src/modules/user_subscription/user_subscription.module";
import { WatchHistoryModule } from "src/modules/watch_history/watch_history.module";
import { WatchHistoryService } from "src/modules/watch_history/watch_history.service";
import { RedisModule } from "../redis/redis.module";
import { CategoryModule } from "src/modules/category/category.module";
import { WatchHistory } from "src/common/models/watch_history.models";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
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
      })
    })
  ]
})

export class Database {}