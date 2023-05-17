import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from "./dto/CreateAssetDto";
import { UpdateAssetDto } from './dto/update-asset.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AssetService {

  constructor(private readonly prisma: PrismaService) { }

  create(createAssetDto: CreateAssetDto) {
    return this.prisma.asset.create({
      data: {
        symbol: createAssetDto.symbol,
        price: createAssetDto.price,
        quanty: createAssetDto.quanty,

      }
    });
  }

  async findAllRecents() {
    return await this.prisma.asset.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  findAll() {
    return `This action returns all asset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
