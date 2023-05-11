import { IsDecimal, IsInt, IsNumber, IsString, isNumber } from "class-validator";

export class CreateAssetDto {

    @IsNumber()
    price: number;

    @IsString()
    symbol: string;

    @IsInt()
    quanty: number;
}
