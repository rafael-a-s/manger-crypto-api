import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortifolioService } from './portifolio.service';
import { CreatePortifolioDto } from './dto/create-portifolio.dto';
import { UpdatePortifolioDto } from './dto/update-portifolio.dto';

@Controller('portifolio')
export class PortifolioController {
  constructor(private readonly portifolioService: PortifolioService) { }

  @Post()
  create(@Body() createPortifolioDto: CreatePortifolioDto) {
    return this.portifolioService.create(createPortifolioDto);
  }

  @Get()
  findAll() {
    return this.portifolioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portifolioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortifolioDto: UpdatePortifolioDto) {
    return this.portifolioService.update(id, updatePortifolioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portifolioService.remove(id);
  }
}
