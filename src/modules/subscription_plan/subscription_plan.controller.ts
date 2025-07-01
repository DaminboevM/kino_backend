import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription_plan.service';
import { CreateSubscriptionPlansDto } from './dto/create.dto';
import { UpdateSubscriptionPlansDto } from './dto/update.dto';
import { UserRole } from 'src/core/type/types';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorator/role.decorator';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Subscription Plans')
@Controller('subscription-plan')
export class SubscriptionPlanController {
  constructor(private readonly subscriptionPlan: SubscriptionPlanService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Barcha obuna rejalarini olish' })
  getAllPlans() {
    return this.subscriptionPlan.getAllPlans();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bitta obuna rejasini olish' })
  getPlan(@Param('id') id: string) {
    return this.subscriptionPlan.getPlan(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi obuna rejasini yaratish' })
  @ApiBody({ type: CreateSubscriptionPlansDto })
  create(@Body() payload: CreateSubscriptionPlansDto) {
    return this.subscriptionPlan.create(payload);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Put('update')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obuna rejasini yangilash' })
  @ApiBody({ type: UpdateSubscriptionPlansDto })
  update(@Body() payload: UpdateSubscriptionPlansDto) {
    return this.subscriptionPlan.update(payload);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Delete('delete/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obuna rejasini o‘chirish' })
  delete(@Param('id') id: string) {
    return this.subscriptionPlan.delete(id);
  }
}
