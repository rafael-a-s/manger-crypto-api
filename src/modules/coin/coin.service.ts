import { Coin } from "./entities/coin.entity";

export class CoinService {
    async findAllCoins(): Promise<Coin[] | any> {
        return await fetch('https://api.binance.com/api/v3/ticker/price')
            .then((response) => response.json())
            .then((data) => {
                return data.map((coin: any): Coin => ({
                    symbol: coin.symbol,
                    price: coin.price
                }));
            });
    }
}