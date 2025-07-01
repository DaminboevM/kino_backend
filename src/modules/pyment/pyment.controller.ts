import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PymentService } from './pyment.service';
import { CreatePaymentDto } from './dto/createpayment.dto';
import { UpdatepaymentDto } from './dto/update.payment.dto';

@ApiTags('Payments')
@Controller('pyment')
export class PymentController {
  constructor(private readonly paymentService: PymentService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Barcha to‘lovlarni olish' })
  getAll() {
    return this.paymentService.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi to‘lov qo‘shish' })
  @ApiBody({ type: CreatePaymentDto })
  create(@Body() payload: CreatePaymentDto) {
    return this.paymentService.create(payload);
  }

  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'To‘lovni yangilash' })
  @ApiBody({ type: UpdatepaymentDto })
  update(@Body() payload: UpdatepaymentDto) {
    return this.paymentService.update(payload);
  }
}
