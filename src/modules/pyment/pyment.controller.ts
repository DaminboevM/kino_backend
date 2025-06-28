import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PymentService } from './pyment.service';
import { CreatePaymentDto } from './dto/createpayment.dto';

@Controller('pyment')
export class PymentController {
    constructor(private readonly paymentService: PymentService) {}


    @Get()
    getAll() {
        return this.paymentService.getAll()    
    }

    
    @Post('create')
    create (@Body() payload: CreatePaymentDto) {
        return this.paymentService.create(payload)
    }


    @Delete(':id')
    delete (@Param('id') id: string) {
        return this.paymentService.delete(id)
    }
}
