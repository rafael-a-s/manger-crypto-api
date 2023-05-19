import { Module } from '@nestjs/common';
import { PortifolioService } from './portifolio.service';
import { PortifolioController } from './portifolio.controller';
import { PrismaService } from 'src/prisma.service';
import { CoinService } from '../coin/coin.service';

@Module({
  controllers: [PortifolioController],
  providers: [PortifolioService, PrismaService, CoinService]
})
export class PortifolioModule { }
