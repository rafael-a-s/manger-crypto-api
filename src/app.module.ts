import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { PortifolioModule } from './modules/portifolio/portifolio.module';
import { AssetModule } from './modules/asset/asset.module';

@Module({
  imports: [PortifolioModule, AssetModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
