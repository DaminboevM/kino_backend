import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSubscriptions } from 'src/common/models/user_subscriptions.models';
import { UserSubscriptionCreateDto } from './dto/create.dto';
import { SubscriptionPlans } from 'src/common/models/subscription_plans.models';

@Injectable()
export class UserSubscriptionService {
  constructor(
    @InjectModel(UserSubscriptions) private readonly userSubscriptionModel: typeof UserSubscriptions,
    @InjectModel(SubscriptionPlans) private readonly subscriptionPlans: typeof SubscriptionPlans
) {}

  async create(user_id: string, payload: UserSubscriptionCreateDto) {
    const plan = await this.subscriptionPlans.findByPk(payload.plan_id)
    if (!plan) throw new NotFoundException('plan_id not found!')

    const now = new Date()
    const endDate = new Date(now)
    endDate.setDate(now.getDate() + plan.dataValues.duration_days)

    await this.userSubscriptionModel.create({
      user_id,
      plan_id: payload.plan_id,
      start_date: now,
      endDate,
    })

    return { message: 'user_subscription successful created !' }
  }



  async findAll() {
    return this.userSubscriptionModel.findAll({ include: { all: true } });
  }


  async findOne(id: string) {
    return this.userSubscriptionModel.findByPk(id, { include: { all: true } });
  }


  async delete(id: string) {
    const data = await this.userSubscriptionModel.findByPk(id)
    if(!data) throw new NotFoundException('user_subscription not found !')

    await this.userSubscriptionModel.destroy({ where: { id } });
    return {message: 'user_subscription succes deleted !'} 
  }
}
