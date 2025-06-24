import { Module } from '@nestjs/common';
import { SubscriptionPlanController } from './subscription_plan.controller';
import { SubscriptionPlanService } from './subscription_plan.service';

@Module({
  controllers: [SubscriptionPlanController],
  providers: [SubscriptionPlanService]
})
export class SubscriptionPlanModule {}
