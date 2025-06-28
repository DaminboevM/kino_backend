import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Categories } from "src/common/models/categories.models";
import { Favorites } from "src/common/models/favorites.models";
import { MovieCategories } from "src/common/models/movie_categories.models";
import { MovieFiles } from "src/common/models/movie_files.models";
import { Movies } from "src/common/models/movies.models";
import { Payments } from "src/common/models/payments.models";
import { Rewievs } from "src/common/models/reviews.models";
import { SubscriptionPlans } from "src/common/models/subscription_plans.models";
import { User } from "src/common/models/user.models";
import { UserSubscriptions } from "src/common/models/user_subscriptions.models";
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