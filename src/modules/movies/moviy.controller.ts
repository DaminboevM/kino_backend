import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnsupportedMediaTypeException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MoviyService } from './moviy.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4} from 'uuid'
import { extname } from 'path';
import { CreateMovieDto } from './dto/createMovieDto';
import { UpdateMovieDto } from './dto/update.dto';
import { UserRole } from 'src/core/type/types';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorator/role.decorator';


@Controller('moviy')
export class MoviyController {
    constructor(private readonly service: MoviyService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Get()
    getAllMovies () {
        return this.service.getAll()
    }


    @Get(':id')
    getOneMovy(@Param('id') id:string) {
        return this.service.getOneMovy(id)  
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Post('create')
    @UseInterceptors(FileInterceptor('poster',{
        storage: diskStorage({
            destination: './uploads/posters', 
                filename: (req, file, cb) => {
                    const posterName = uuidv4() + extname(file.originalname) 
                    cb(null, posterName) }}),fileFilter: (req, file, callback) => { 
                        const allowed = ['image/jpeg', 'image/jpg', 'image/png'] 
                        if(!allowed.includes(file.mimetype)) {
                            return callback(new UnsupportedMediaTypeException('Type must be .jpg, .jpeg, .png '), false) 
                        }
                        callback(null, true)
                }
            }
    ))
    createMovie(@UploadedFile() poster: Express.Multer.File, @Body() payload: CreateMovieDto, @Req() req: Request) {
        return this.service.create(req['user'].id, payload, poster.filename)
    }




    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Put('update')
    @UseInterceptors(FileInterceptor('poster', {
        storage: diskStorage({
            destination: './uploads/posters',
                filename: (req, file, cb) => {
                    const posterName = uuidv4() + extname(file.originalname);
                    cb(null, posterName);
                },
            }),
        fileFilter: (req, file, callback) => {
            const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowed.includes(file.mimetype)) {
            return callback(
                new UnsupportedMediaTypeException('Type must be .jpg, .jpeg, .png'),
                false,
            );
            }
            callback(null, true);
        },
    }))
    updateMovie(@UploadedFile() poster: Express.Multer.File, @Body() payload: Required<UpdateMovieDto>,) {
        const id = 'c2c3864a-8131-4277-b312-3136e2f0333d'
        return this.service.update(id, payload, poster?.filename);
    }




    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
    @Delete(':id')
    deleteMove (@Param('id') id: string) {
        return this.service.delete(id)
    }
}