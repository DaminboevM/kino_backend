import {  BadRequestException, Body,Controller, Delete,Get, Param,Post,Put, Query,Req,UnsupportedMediaTypeException, UploadedFile,UseGuards, UseInterceptors, } from '@nestjs/common';
import { MoviyService } from './moviy.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { CreateMovieDto } from './dto/createMovieDto';
import { UpdateMovieDto } from './dto/update.dto';
import { UserRole } from 'src/core/type/types';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorator/role.decorator';
import { MoveQueryDto } from './dto/qeury.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Movies')
@ApiBearerAuth()
@Controller('moviy')
export class MoviyController {
  constructor(private readonly service: MoviyService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Get()
 
  @ApiOperation({ summary: 'Barcha kinolarni olish (filterlar bilan)' })
  getAllMovies(@Query() query: MoveQueryDto) {
    return this.service.getAll(query);
  }

  @UseGuards(AuthGuard)
  @Get('top-movies')
  @ApiBearerAuth()
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Nechta top kinoni olish kerakligi (ixtiyoriy)' })
  @ApiOperation({ summary: 'Eng ko‘p ko‘rilgan kinolarni olish' })
  getTopMovies(@Query('limit') limit?: number) {
    if (limit && isNaN(Number(limit)))
      throw new BadRequestException('"limit" must be a number');
    return this.service.getTopMovies(limit);
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Bitta kinoni olish (ID orqali)' })
  getOneMovy(@Param('id') id: string) {
    return this.service.getOneMovy(id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Post('create')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Yangi kino yaratish (poster bilan)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        slug: { type: 'string' },
        description: { type: 'string' },
        release_year: { type: 'number' },
        duration_minutes: { type: 'number' },
        rating: { type: 'string' },
        subscription_type: { type: 'string', enum: ['free', 'premium'] },
        poster: { type: 'string', format: 'binary' },
      },
      required: ['title', 'slug', 'description', 'release_year', 'duration_minutes', 'rating', 'subscription_type', 'poster'],
    },
  })
  @UseInterceptors(
    FileInterceptor('poster', {
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
    }),
  )
  createMovie(
    @UploadedFile() poster: Express.Multer.File,
    @Body() payload: CreateMovieDto,
    @Req() req: Request,
  ) {
    return this.service.create(req['user'].id, payload, poster.filename);
  }

  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Put('update')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Kino maʼlumotlarini tahrirlash (poster bilan)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        title: { type: 'string' },
        slug: { type: 'string' },
        description: { type: 'string' },
        release_year: { type: 'number' },
        duration_minutes: { type: 'number' },
        rating: { type: 'string' },
        subscription_type: { type: 'string', enum: ['free', 'premium'] },
        poster: { type: 'string', format: 'binary' },
      },
      required: ['id'],
    },
  })
  @UseInterceptors(
    FileInterceptor('poster', {
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
    }),
  )
  updateMovie(
    @UploadedFile() poster: Express.Multer.File,
    @Body() payload: UpdateMovieDto,
  ) {
    return this.service.update(payload, poster?.filename);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kino o‘chirish (ID orqali)' })
  deleteMove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
