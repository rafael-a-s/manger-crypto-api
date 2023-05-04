import { Module } from '@nestjs/common';
import { PortifolioService } from './portifolio.service';
import { PortifolioController } from './portifolio.controller';

@Module({
  controllers: [PortifolioController],
  providers: [PortifolioService]
})
export class PortifolioModule {}
