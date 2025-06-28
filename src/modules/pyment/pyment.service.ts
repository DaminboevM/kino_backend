import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payments } from 'src/common/models/payments.models';
import { CreatePaymentDto } from './dto/createpayment.dto';

@Injectable()
export class PymentService {
    constructor(@InjectModel(Payments) private readonly paymentModel: typeof Payments) {}


    async getAll () {
        return this.paymentModel.findAll()
    }


    async create (payload: CreatePaymentDto) {
        // const data = await 
    }


    async delete (id: string) {}
}
