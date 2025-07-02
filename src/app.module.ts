import { Module } from "@nestjs/common";
import { MainCore } from "./common/config/database/Maincore";
import { SeedersModule } from "./core/seeders/seeders.module";


@Module({
  imports: [MainCore, SeedersModule]
})
export class AppModule {}
