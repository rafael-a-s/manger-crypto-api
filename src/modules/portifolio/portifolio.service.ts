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
        },
        include: {
          assets: true
        }
      });
    } catch (error) {
      throw new InternalServerErrorException({ message: "Erro ao cadastrar Portifolio." });
    }
  }

  async findAll() {
    return await this.prisma.portifolio.findMany({
      include: {
        assets: true
      }
    });
  }

  async findOne(id: string) {
    return await this.prisma.portifolio.findUnique({
      where: {
        id: id,
      },
      include: {
        assets: true
      }
    });
  }

  async update(id: string, data: UpdatePortifolioDto) {
    try {
      return await this.prisma.portifolio.update({
        where: {
          id: id
        },
        data: {
          name: data.name,
        },
        include: {
          assets: true
        }
      });
    } catch (error) {
      throw new InternalServerErrorException({ message: "Erro ao atualizar seu Portifolio." });
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.asset.deleteMany({
        where: {
          portifolioId: id
        }
      });

      await this.prisma.portifolio.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new InternalServerErrorException({ message: "Erro ao excluir seu Portifolio." });
    }


  }
}
