import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnsupportedMediaTypeException, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
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
import { ApiTags, ApiOperation, ApiBody, ApiConsumes, ApiParam, ApiBearerAuth, } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ID orqali foydalanuvchini olish' })
  @ApiParam({ name: 'id', type: 'string' })
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Post('add/admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi admin qo‘shish' })
  @ApiBody({ type: AddAdminDto })
  addAdmin(@Body() payload: AddAdminDto) {
    return this.userService.addAdmin(payload);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Put('add/admin/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Foydalanuvchiga admin huquqi berish' })
  @ApiParam({ name: 'id', type: 'string' })
  updateUserForAdmin(@Param('id') id: UuidParamDto) {
    return this.userService.updateUserForAdmin(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Put('update')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Foydalanuvchini yangilash (avatar bilan)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        phone: { type: 'string' },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const avatarName = uuidv4() + extname(file.originalname);
          cb(null, avatarName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowed.includes(file.mimetype)) {
          return cb(
            new UnsupportedMediaTypeException(
              'Type must be .jpg, .jpeg, .png !',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  updateUser(
    @Body() payload: UserUpdateDto,
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.userService.updateUser(req['user'].id, {
      ...payload,
      avatar_url: avatar?.filename,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Foydalanuvchini o‘chirish' })
  @ApiParam({ name: 'id', type: 'string' })
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
