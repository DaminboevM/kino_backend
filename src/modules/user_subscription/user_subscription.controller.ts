import { Controller, Post, Get, Param, Body, Delete, UseGuards, Req, } from '@nestjs/common';
import { UserSubscriptionService } from './user_subscription.service';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorator/role.decorator';
import { UserRole } from 'src/core/type/types';
import { UserSubscriptionCreateDto } from './dto/create.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiBearerAuth, } from '@nestjs/swagger';

@ApiTags('User Subscriptions')
@Controller('user-subscriptions')
export class UserSubscriptionController {
  constructor(private readonly service: UserSubscriptionService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi foydalanuvchi obunasini yaratish' })
  @ApiBody({ type: UserSubscriptionCreateDto })
  create(@Body() dto: UserSubscriptionCreateDto, @Req() req: Request) {
    return this.service.create(req['user'].id, dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Barcha foydalanuvchi obunalarini olish' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bitta foydalanuvchi obunasini olish' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Foydalanuvchi obunasini o‘chirish' })
  @ApiParam({ name: 'id', type: 'string' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
