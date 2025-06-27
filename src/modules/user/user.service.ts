import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/common/models/user.models';
import { UserUpdateDto } from './dto/update.dto'; 
import { AddAdminDto } from './dto/addAdmin.dto';
import { Op } from 'sequelize'
import { UserRole } from 'src/core/type/types';
import { UuidParamDto } from './dto/param.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userModel: typeof User) {}

    async getUsers () {
        return this.userModel.findAll()
    }

    
    async getUser (id: string) {
        return this.userModel.findByPk(id)
    }


    async addAdmin(payload: Required<AddAdminDto>) {
        const data = await this.userModel.findOne({ where: { [Op.or]: [ { username: payload.username }, { email: payload.email } ]} })
        if(data) throw new ConflictException('alredy username or email exists')
        
        await this.userModel.create(payload)
        return 'admin succsessfull created !'
    }


    async updateUserForAdmin(id: Required<UuidParamDto>) {
        const data = await this.userModel.findByPk(id as any)
        if(!data) throw new NotFoundException('user not found !')

        data.update({role: UserRole.ADMIN})
        return 'user role successfully updated to admin !'
    }


    async updateUser(payload: UserUpdateDto) {
        const user = await this.userModel.findByPk(payload.id)
        if(!user) throw new NotFoundException('user not found !')
        await user.update(payload)
        return 'user successfully updated !'
    }


    async deleteUser (id: string) {
        const user = await this.userModel.destroy({where: {id}})
        if(!user) throw new NotFoundException('user not found !')
        return 'user successfully deleted'
    }
}
