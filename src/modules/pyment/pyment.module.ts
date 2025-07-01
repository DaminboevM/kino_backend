import { Module } from '@nestjs/common';
import { PymentController } from './pyment.controller';
import { PymentService } from './pyment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payments } from 'src/common/models/payments.models';
import { UserSubscriptions } from 'src/common/models/user_subscriptions.models';
import { SubscriptionPlans } from 'src/common/models/subscription_plans.models';

@Module({
  controllers: [PymentController],
  providers: [PymentService],
  imports: [SequelizeModule.forFeature([Payments, UserSubscriptions, SubscriptionPlans])]
})
export class PymentModule {}
