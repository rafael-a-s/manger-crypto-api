import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePortifolioDto } from './dto/create-portifolio.dto';
import { UpdatePortifolioDto } from './dto/update-portifolio.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateAssetDto } from '../asset/dto/CreateAssetDto';
import { CoinService } from '../coin/coin.service';
import { Coin } from '../coin/entities/coin.entity';

@Injectable()
export class PortifolioService {

  constructor(private readonly prisma: PrismaService,
    private readonly coinService: CoinService) { }

  async create(data: CreatePortifolioDto) {
    try {
      return await this.prisma.portifolio.create({
        data: {
          coin: data.coin,
          name: data.name,
          subTotal: this.calculeSubTotal(data.assets),
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
    try {
      const portifolios = await this.prisma.portifolio.findMany({
        include: {
          assets: true
        }
      });

      const result = [];
      for (const portifolio of portifolios) {
        const preparedPortifolio = await this.preparePortifolioToSend(portifolio);
        result.push(preparedPortifolio);
      }

      return result;

    } catch (error) {

    }
  }

  async findOne(id: string) {
    try {
      let portifolio;
      portifolio = await this.prisma.portifolio.findUnique({
        where: {
          id: id,
        },
        include: {
          assets: true
        }
      }).then((result) => portifolio = result);

      return this.preparePortifolioToSend(portifolio);

    } catch (error) {
      throw new InternalServerErrorException({ message: "Erro ao buscar registro Portifolio." });
    }

  }

  async addAssetPortifolio(id: string, data: CreateAssetDto) {
    try {
      let portifolio = await this.prisma.portifolio.update({
        where: {
          id: id
        },
        data: {
          assets: {
            create: [
              {
                price: +data.price,
                symbol: data.symbol,
                quanty: +data.quanty,
              }
            ]
          }
        },
        include: {
          assets: true
        }
      });

      return this.preparePortifolioToSend(portifolio);

    } catch (error) {
      throw new InternalServerErrorException({ message: "Erro ao adicionar um ativo no seu Portifolio." });
    }
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

  async returnedInfosGeneralAboutPortifolios() {
    let portifolios = await this.findAll();
    let coins = await this.coinService.findAllCoins();

    let total = 0;
    portifolios.forEach((portifolio) => total += portifolio.subTotal);

    let totalUpdated = this.calculateSubTotalWhenPricesUpdateds(coins, portifolios);

  }

  async preparePortifolioToSend(portifolio: any) {

    let coin;
    await fetch('https://api.binance.com/api/v3/ticker/price?symbol=' + portifolio.coin)
      .then((response) => response.json())
      .then((json) => coin = json);

    let totalUpdated = 0;
    if (portifolio.assets && portifolio.assets.length > 0) {
      portifolio.assets.map((value) => {
        totalUpdated += +value.quanty * +coin.price;
      });
    }

    portifolio.totalPriceActual = totalUpdated;
    portifolio.percent = this.calculePercentBeforeOfSend(portifolio.subTotal, totalUpdated);

    return portifolio;
  }

  calculePercentBeforeOfSend(subTotal: number, totalPriceActual: number) {
    return ((subTotal - totalPriceActual) / totalPriceActual) * 100;
  }

  calculeSubTotal(list: CreateAssetDto[]): number {
    let subTotal = 0;

    list.map((x) => subTotal += x.price * x.quanty);

    return subTotal;
  }

  calculateSubTotalWhenPricesUpdateds(coins: Coin[], portifolios: any[]): number {
    let total = 0;

    portifolios.forEach((value) => {
      let coin = coins.find(value.coin);

      value.assets.forEach((asset) => {
        total += (asset.quanty * coin.price);

      });

    });

    return total;
  }

}
