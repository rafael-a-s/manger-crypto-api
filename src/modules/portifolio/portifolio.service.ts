import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePortifolioDto } from './dto/create-portifolio.dto';
import { UpdatePortifolioDto } from './dto/update-portifolio.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateAssetDto } from '../asset/dto/CreateAssetDto';

@Injectable()
export class PortifolioService {

  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreatePortifolioDto) {
    try {
      return await this.prisma.portifolio.create({
        data: {
          coin: data.coin,
          name: data.name,
          assets: {
            create: [
              ...data.assets.map((value: CreateAssetDto) => {
                const asset: Prisma.AssetUncheckedCreateWithoutPortifolioInput = {
                  price: +value.price,
                  symbol: value.symbol,
                  quanty: +value.quanty,
                };
                return asset;
              })
            ]
          }
        }
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({ message: "Erro ao cadastrar Portifolio." });
    }
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
