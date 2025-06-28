import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ReviwsService } from './reviws.service';
import { CreateReviewDto } from './dto/createReview.dto';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';


@Controller('reviws')
export class ReviwsController {
    constructor(private readonly reviewsService: ReviwsService) {}


    @Get()
    getAll () {
        return this.reviewsService.getAll()
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Post('create')
    create(@Body() payload: CreateReviewDto, @Req() req: Request) {
        return this.reviewsService.create(req['user'].id, payload)
    }


    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.reviewsService.delete(id)
    }
}
