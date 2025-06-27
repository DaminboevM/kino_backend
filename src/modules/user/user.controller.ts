import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserUpdateDto } from './dto/update.dto';
import { AddAdminDto } from './dto/addAdmin.dto';
import { UuidParamDto } from './dto/param.dto';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorator/role.decorator';
import { UserRole } from 'src/core/type/types';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Get()
    getUsers () {
        return this.userService.getUsers()
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.getUser(id)
    }
    
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Post('add/admin')
    addAdmin (@Body() payload: AddAdminDto) {
        return this.userService.addAdmin(payload)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Put('add/admin/:id')
    updateUserForAdmin (@Param('id') id: Required<UuidParamDto>) {
        return this.userService.updateUserForAdmin(id)
    }
 

    @Put('update')
    updateUser(@Body() payload: UserUpdateDto) {
        return this.userService.updateUser(payload)
    }


    @Delete(':id')
    deleteUser (@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }
}
