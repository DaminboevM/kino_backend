import { Body, Controller, Post, UnsupportedMediaTypeException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MoviyService } from './moviy.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4} from 'uuid'
import { extname } from 'path';
import { CreateMovieDto } from './dto/createMovieDto';

@Controller('moviy')
export class MoviyController {
    constructor(private readonly service: MoviyService) {}

    @Post()
    @UseInterceptors(FileInterceptor('poster', 
        {storage: diskStorage({destination: './uploads/posters',
            filename: (req, file, cb) => {
                let posterName = uuidv4() + "_" + extname(file.originalname)
                cb(null, posterName)
    }}),
    fileFilter: (req, file, callback) => {
        let allowed = ['image/jpeg', 'image/jpg', 'image/png']
        if(!allowed.includes(file.mimetype)) {
            return callback(new UnsupportedMediaTypeException('Type must be .jpg, .jpeg, .png '), false)
        }
        callback(null, true)
}}))
    createMovie(@UploadedFile() poster: Express.Multer.File, @Body() payload: CreateMovieDto) {
        const id = ''
        return this.service.create(id, payload, poster.filename)
    }
}