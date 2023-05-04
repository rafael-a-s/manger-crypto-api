import { Injectable } from '@nestjs/common';
import { CreatePortifolioDto } from './dto/create-portifolio.dto';
import { UpdatePortifolioDto } from './dto/update-portifolio.dto';

@Injectable()
export class PortifolioService {
  create(createPortifolioDto: CreatePortifolioDto) {
    return 'This action adds a new portifolio';
  }

  findAll() {
    return `This action returns all portifolio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} portifolio`;
  }

  update(id: number, updatePortifolioDto: UpdatePortifolioDto) {
    return `This action updates a #${id} portifolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} portifolio`;
  }
}
