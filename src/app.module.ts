import { Module } from "@nestjs/common";
import { MainCore } from "./common/config/database/Maincore";


@Module({
  imports: [MainCore]
})
export class AppModule {}
