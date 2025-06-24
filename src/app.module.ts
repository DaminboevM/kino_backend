import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SubscriptionPlanModule } from './modules/subscription_plan/subscription_plan.module';
import { UserSubscriptionService } from './modules/user_subscription/user_subscription.service';
import { UserSubscriptionController } from './modules/user_subscription/user_subscription.controller';
import { UserSubscriptionModule } from './modules/user_subscription/user_subscription.module';
import { PymentModule } from './modules/pyment/pyment.module';
import { CategoryService } from './modules/category/category.service';
import { CategoryController } from './modules/category/category.controller';
import { CategoryModule } from './modules/category/category.module';
import { MoviyModule } from './modules/moviy/moviy.module';
import { MovieCategoriesService } from './modules/movie_categories/movie_categories.service';
import { MovieCategoriesController } from './modules/movie_categories/movie_categories.controller';
import { MovieCategoriesModule } from './modules/movie_categories/movie_categories.module';
import { MovieFilesModule } from './modules/movie_files/movie_files.module';
import { FavoritesService } from './modules/favorites/favorites.service';
import { FavoritesController } from './modules/favorites/favorites.controller';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ReviwsModule } from './modules/reviws/reviws.module';
import { WatchHistoryService } from './modules/watch_history/watch_history.service';
import { WatchHistoryController } from './modules/watch_history/watch_history.controller';
import { WatchHistoryModule } from './modules/watch_history/watch_history.module';


@Module({
  imports: [AuthModule, UserModule, ProfileModule, SubscriptionPlanModule, UserSubscriptionModule, PymentModule, CategoryModule, MoviyModule, MovieCategoriesModule, MovieFilesModule, FavoritesModule, ReviwsModule, WatchHistoryModule],
  controllers: [UserSubscriptionController, CategoryController, MovieCategoriesController, FavoritesController, WatchHistoryController],
  providers: [UserSubscriptionService, CategoryService, MovieCategoriesService, FavoritesService, WatchHistoryService],
})
export class AppModule {}
