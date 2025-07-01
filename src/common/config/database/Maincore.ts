import { Module } from "@nestjs/common";
import { AuthModule } from "src/modules/auth/auth.module";
import { Database } from "./database.module";
import { CategoryModule } from "src/modules/category/category.module";
import { FavoritesModule } from "src/modules/favorites/favorites.module";
import { MovieFilesModule } from "src/modules/movie_files/movie_files.module";
import { MoviyModule } from "src/modules/movies/moviy.module";
import { MovieCategoriesModule } from "src/modules/movie_categories/movie_categories.module";
import { ReviwsModule } from "src/modules/reviews/reviws.module"; 
import { SubscriptionPlanModule } from "src/modules/subscription_plan/subscription_plan.module";
import { UserModule } from "src/modules/user/user.module";
import { UserSubscriptionModule } from "src/modules/user_subscription/user_subscription.module";
import { WatchHistoryModule } from "src/modules/watch_history/watch_history.module";
import { PymentModule } from "src/modules/pyment/pyment.module";



@Module({
    imports:[
        AuthModule, 
        CategoryModule, 
        FavoritesModule, 
        MovieFilesModule, 
        MoviyModule, 
        MovieCategoriesModule,
        ReviwsModule, 
        SubscriptionPlanModule, 
        UserModule, 
        UserSubscriptionModule, 
        WatchHistoryModule, 
        Database, 
        PymentModule
    ]
})

export class MainCore {}