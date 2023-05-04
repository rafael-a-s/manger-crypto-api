import { Test, TestingModule } from '@nestjs/testing';
import { PortifolioService } from './portifolio.service';

describe('PortifolioService', () => {
  let service: PortifolioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortifolioService],
    }).compile();

    service = module.get<PortifolioService>(PortifolioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
