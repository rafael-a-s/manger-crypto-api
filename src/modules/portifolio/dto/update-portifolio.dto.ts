import { PartialType } from '@nestjs/mapped-types';
import { CreatePortifolioDto } from './create-portifolio.dto';

export class UpdatePortifolioDto extends PartialType(CreatePortifolioDto) { }
