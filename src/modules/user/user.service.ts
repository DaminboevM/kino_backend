import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/common/models/user.models';
import { UserUpdateDto } from './dto/update.dto'; 
import { AddAdminDto } from './dto/addAdmin.dto';
import { Op } from 'sequelize'
import { UserRole } from 'src/core/type/types';
import { UuidParamDto } from './dto/param.dto';
import { hashPass } from 'src/common/config/bcrypt/bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userModel: typeof User) {}

    async getUsers () {
        return this.userModel.findAll()
    }

    
    async getUser (id: string) {
        return this.userModel.findByPk(id)
    }


    async addAdmin(payload: AddAdminDto) {
        const data = await this.userModel.findOne({ where: { [Op.or]: [ { username: payload.username }, { email: payload.email } ]} })
        if(data) throw new ConflictException('alredy username or email exists')
        const hash = await hashPass(payload.password)
        await this.userModel.create({...payload, password: hash})
        return {message: 'admin succsessfull created !'}
    }


    async updateUserForAdmin(id: UuidParamDto) {
        const data = await this.userModel.findByPk(id as any)
        if(!data) throw new NotFoundException('user not found !')

        data.update({role: UserRole.ADMIN})
        return {message: 'user role successfully updated to admin !'}
    }


    async updateUser(user_id: string, payload: UserUpdateDto, filename?: string) {
        const user = await this.userModel.findByPk(user_id)
        if(!user) throw new NotFoundException('user not found !')
        
        if(filename) user.avatar_url = filename
        await user.update(payload)
        return {message: 'user successfully updated !'}
    }


    async deleteUser (id: string) {
        const user = await this.userModel.destroy({where: {id}})
        if(!user) throw new NotFoundException('user not found !')
        return {message: 'user successfully deleted'}
    }
}
