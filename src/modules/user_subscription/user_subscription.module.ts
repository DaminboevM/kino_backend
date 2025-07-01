import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSubscriptions } from 'src/common/models/user_subscriptions.models';
import { UserSubscriptionService } from './user_subscription.service';
import { UserSubscriptionController } from './user_subscription.controller';
import { SubscriptionPlans } from 'src/common/models/subscription_plans.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [SequelizeModule.forFeature([UserSubscriptions, SubscriptionPlans]), JwtModule],
    providers: [UserSubscriptionService],
    controllers: [UserSubscriptionController]
})
export class UserSubscriptionModule {}
