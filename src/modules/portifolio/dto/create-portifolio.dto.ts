import { Prisma } from "@prisma/client";
import { IsString, ValidateNested } from "class-validator";
import { Portifolio } from "../entities/portifolio.entity";
import { CreateAssetDto } from "src/modules/asset/dto/CreateAssetDto";
import { Type } from "class-transformer";

export class CreatePortifolioDto {

    @IsString()
    name: string;

    @IsString()
    coin: string;

    @ValidateNested({ each: true })
    @Type(() => CreateAssetDto)
    assets?: CreateAssetDto[];

}