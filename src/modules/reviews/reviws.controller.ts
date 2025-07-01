import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ReviwsService } from './reviws.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';

@ApiTags('Reviews')
@Controller('reviws')
export class ReviwsController {
  constructor(private readonly reviewsService: ReviwsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Barcha reviewlarni olish' })
  getAll() {
    return this.reviewsService.getAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi review qo‘shish' })
  @ApiBody({ type: CreateReviewDto })
  create(@Body() payload: CreateReviewDto, @Req() req: Request) {
    return this.reviewsService.create(req['user'].id, payload);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reviewni o‘chirish' })
  delete(@Param('id') id: string) {
    return this.reviewsService.delete(id);
  }
}
