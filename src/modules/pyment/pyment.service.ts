import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payments } from 'src/common/models/payments.models';
import { CreatePaymentDto } from './dto/createpayment.dto';
import { UserSubscriptions } from 'src/common/models/user_subscriptions.models';
import { SubscriptionPlans } from 'src/common/models/subscription_plans.models';
import { PymentStatus, Status } from 'src/core/type/types';
import { UpdatepaymentDto } from './dto/update.payment.dto';

@Injectable()
export class PymentService {
    constructor(
        @InjectModel(Payments) private readonly paymentModel: typeof Payments,
        @InjectModel(UserSubscriptions) private userSubscription: typeof UserSubscriptions,
        @InjectModel(SubscriptionPlans) private subscriptionPlan: typeof SubscriptionPlans
    ) { }


    async getAll() {
        return this.paymentModel.findAll({ include: { all: true } })
    }


    async create(payload: CreatePaymentDto) {
        if (payload.amount < 1) throw new BadRequestException('amount notogri  !!!')

        const userSubscription = await this.userSubscription.findByPk(payload.user_subscription_id)
        console.log(payload)
        if (!userSubscription) throw new NotFoundException('user subscription not found !')

        const subscriptionPlan = await this.subscriptionPlan.findByPk(userSubscription.dataValues.plan_id)
        if (!subscriptionPlan) throw new NotFoundException('subscription plan not found !')
        if (!subscriptionPlan.dataValues.is_active) throw new BadRequestException('subscriptionPlan not activate !')

        await this.paymentModel.create({ ...payload, status: PymentStatus.completed })

        if (payload.amount >= subscriptionPlan.dataValues.price) {
            await userSubscription.update({ status: Status.active })
            return { succes: true, message: 'payment succesfully created and subscription activated!' }
        }

        return { succes: true, message: `qoldiq ${subscriptionPlan.dataValues.price - payload.amount}` }
    }



    async update(payload: UpdatepaymentDto) {
        const payment = await this.paymentModel.findByPk(payload.payment_id)
        if (!payment) throw new NotFoundException('payment not found !')

        const userSubscription = await this.userSubscription.findByPk(payment.dataValues.user_subscription_id)
        if (!userSubscription) throw new NotFoundException('user Subscription not found !')

        const subscriptionPlan = await this.subscriptionPlan.findByPk(userSubscription.dataValues.plan_id)
        if (!subscriptionPlan) throw new NotFoundException('subscription plan not found !')

        if (!subscriptionPlan.dataValues.is_active) throw new BadRequestException('subscriptionPlan not activate !')

        const total = payment.dataValues.amount + payload.amount
        await payment.update({ amount: total })

        if ((total) >= subscriptionPlan.dataValues.price) {
            await userSubscription.update({ status: Status.active })
            return { succes: true, message: 'payment updated !' }
        }

        const qoldiq = subscriptionPlan.price - (total)
        return { message: `qoldiq ${qoldiq}` }
    }


}
