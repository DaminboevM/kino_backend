import { Body, Controller, Get, Param, Post, Req, UnsupportedMediaTypeException, UploadedFile, UseGuards, UseInterceptors,} from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { CreateMovieFileDto } from './dto/create.dto';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorator/role.decorator';
import { UserRole } from 'src/core/type/types';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Movie Files')
@Controller('movie-files')
export class MovieFilesController {
  constructor(private readonly movieFileService: MovieFilesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Barcha kino fayllarni olish' })
  getAll() {
    return this.movieFileService.getAll();
  }


  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'kinoni korish' })
  @Get('file/:id')
  getFile (@Param('id') id: string, @Req() req: Request) {
    return this.movieFileService.getOne(id, req['user'].id)  
  }

  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Post('create')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Yangi kino faylini yuklash (video bilan)' })
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, cb) => {
          const videoName = uuidv4() + extname(file.originalname);
          cb(null, videoName);
        },  
      }),  
      fileFilter: (req, file, callback) => {
        const allowed = ['video/mp4', 'video/webm'];
        if (!allowed.includes(file.mimetype)) {
          return callback(
            new UnsupportedMediaTypeException(
              'Only .mp4 or .webm types are allowed',
            ),  
            false,
          );  
        }  
        callback(null, true);
      },  
    }),  
  )  
  create(
    @Body() payload: CreateMovieFileDto,
    @UploadedFile() video: Express.Multer.File,
  ) {
    return this.movieFileService.create(payload, video);
  }  


}
