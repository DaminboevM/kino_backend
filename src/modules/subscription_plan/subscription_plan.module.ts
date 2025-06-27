import { Module } from '@nestjs/common';
import { SubscriptionPlanController } from './subscription_plan.controller';
import { SubscriptionPlanService } from './subscription_plan.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriptionPlans } from 'src/common/models/subscription_plans.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([SubscriptionPlans]), JwtModule],
  controllers: [SubscriptionPlanController],
  providers: [SubscriptionPlanService]
})
export class SubscriptionPlanModule {}
