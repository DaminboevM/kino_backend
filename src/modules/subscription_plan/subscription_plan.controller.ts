import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription_plan.service';
import { CreateSubscriptionPlansDto } from './dto/create.dto';
import { UpdateSubscriptionPlansDto } from './dto/update.dto';
import { UserRole } from 'src/core/type/types';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorator/role.decorator';

@Controller('subscription-plan')
export class SubscriptionPlanController {

    constructor(private readonly subscriptionPlan: SubscriptionPlanService) {}

    @Get()
    getAllPlans () {
        return this.subscriptionPlan.getAllPlans()
    }
    

    @Get(':id')
    getPlan (@Param('id') id: string) {
        return this.subscriptionPlan.getPlan(id)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Post('create')
    create (@Body() payload: CreateSubscriptionPlansDto) {
        return this.subscriptionPlan.create(payload)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Put('update')
    update (@Body() payload: Required<UpdateSubscriptionPlansDto>) {
        return this.subscriptionPlan.update(payload)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Delete('delete/:id')
    delete (@Param('id') id: string) {
        return this.subscriptionPlan.delete(id)
    }
}
