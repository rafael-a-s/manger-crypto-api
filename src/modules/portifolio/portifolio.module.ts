import { Module } from '@nestjs/common';
import { PortifolioService } from './portifolio.service';
import { PortifolioController } from './portifolio.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PortifolioController],
  providers: [PortifolioService, PrismaService]
})
export class PortifolioModule { }
