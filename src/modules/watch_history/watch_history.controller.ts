import { Body, Controller, Get, Param, Post, Put, Req, UseGuards, } from '@nestjs/common';
import { WatchHistoryService } from './watch_history.service';
import { CreateWatchHistoryDto } from './dto/createWatchHistory.dto';
import { UpdateWatchHistoryDto } from './dto/updateWatchHistory.dto';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Watch History')
@Controller('watch-history')
export class WatchHistoryController {
  constructor(private readonly wathHistoryService: WatchHistoryService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Barcha tomosha tarixlarini olish' })
  getAll() {
    return this.wathHistoryService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ID bo‘yicha tomosha tarixini olish' })
  @ApiParam({ name: 'id', type: 'string' })
  getOne(@Param('id') id: string) {
    return this.wathHistoryService.getOne(id);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi tomosha tarixi yozuvini yaratish' })
  @ApiBody({ type: CreateWatchHistoryDto })
  create(@Body() payload: CreateWatchHistoryDto, @Req() req: Request) {
    return this.wathHistoryService.create(payload, req['user'].id);
  }

  @UseGuards(AuthGuard)
  @Put('update')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tomosha tarixini yangilash' })
  @ApiBody({ type: UpdateWatchHistoryDto })
  update(@Body() payload: UpdateWatchHistoryDto, @Req() req: Request) {
    return this.wathHistoryService.update(payload, req['user'].id);
  }
}
