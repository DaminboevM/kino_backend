import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnsupportedMediaTypeException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserUpdateDto } from './dto/update.dto';
import { AddAdminDto } from './dto/addAdmin.dto';
import { UuidParamDto } from './dto/param.dto';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorator/role.decorator';
import { UserRole } from 'src/core/type/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

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


    @UseGuards(AuthGuard, RolesGuard)
    @Put('update')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads/avatars',
                filename: (req, file, cb) => {
                    const avatarName = uuidv4() + extname(file.originalname)
                    cb(null, avatarName)
                }
        }), 
        fileFilter: (req, file, cb) => {
            const allowed = ['image/jpeg', 'image/jpg', 'image/png']
            if(!allowed.includes(file.mimetype)) {
                return cb(new UnsupportedMediaTypeException('Type must be .jpg, .jpeg, .png !'), false)
            }
            cb(null, true)
        }
    }))
    updateUser(@Body() payload: UserUpdateDto, @UploadedFile() avatar: Express.Multer.File, @Req() req: Request) {
        return this.userService.updateUser(req['user'].id, {...payload, avatar_url: avatar?.filename})
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Delete()
    deleteUser (@Req() req: Request) {
        return this.userService.deleteUser(req['user'].id)
    }
}
