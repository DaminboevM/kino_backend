import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionPlans } from 'src/common/models/subscription_plans.models';
import { CreateSubscriptionPlansDto } from './dto/create.dto';
import { UpdateSubscriptionPlansDto } from './dto/update.dto';

@Injectable()
export class SubscriptionPlanService {
    constructor(@InjectModel(SubscriptionPlans) private readonly subscriptionPlansModel: typeof SubscriptionPlans) {}


    async getAllPlans() {
        const data = await this.subscriptionPlansModel.findAll()
        return data
    }
    

    async getPlan(id: string) {
        const data = await this.subscriptionPlansModel.findByPk(id)
        return data  
    }


    async create (payload: Required<CreateSubscriptionPlansDto>) {
        await this.subscriptionPlansModel.create(payload)
        return 'subscription plans succsessful created !!!'
    }


    async update (payload: Required<UpdateSubscriptionPlansDto>) {
        const data = await this.subscriptionPlansModel.findByPk(payload.id)
        if(!data) throw new NotFoundException('not found !')
        data.update(payload)
        return 'subscription plans succsessful updated !!!'
    }


    async delete (id: string) {
        const data = await this.subscriptionPlansModel.findByPk(id)
        if(!data) throw new NotFoundException('not found !')
        this.subscriptionPlansModel.destroy({where: {id}})
        
        return 'subscription plans succsessful deleted !!!'
    }   
}
