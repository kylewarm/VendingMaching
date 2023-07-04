// @ts-ignore

import {countMoney, formatAmount, getChangeCoins, sortDescending} from "./coins";

enum ErrorCode {
    AllGood = 0,
    NotDefinedProduct = 1,
    ProductIsMissing = 2,
    NotEnoughMoney = 3,
    NoCoinsToGiveChange = 4,
    CannotParseCoins = 5,

}

export const products = {
    productNames: [
      { name: 'Mars', price: 1.99 },
      { name: 'Snickers', price: 1.85 },
      { name: 'Cola', price: 1.33 },
      { name: 'Salted nuts', price: 2.50 },
    ]
  };

export function getPrice(productName: string) {
    const product = products.productNames.find((product) => product.name === productName);
    return product?.price;
  }

export function sellProduct(productName: string, coins: string, missingCoins: number[] = []) {

    if (!productName) {
        return {
            sell: false,
            change: sortDescending(coins),
            code: ErrorCode.NotDefinedProduct
        };
    }
    let productPrice = getPrice(productName);
    const moneySubmitted = countMoney(coins);

    if (!(moneySubmitted)) {
        return  {
            sell: false,
            change: coins,
            code: ErrorCode.CannotParseCoins
        };
    }

    if (!productPrice) {
        const change = sortDescending(coins);
        return {
            sell: false,
            change: change,
            code: ErrorCode.ProductIsMissing
        };
    }

    productPrice *= 100;

    if (moneySubmitted < productPrice) {
        // const change = ranged(req.body.coins);
        const change = sortDescending(coins);
        return {
            sell: false,
            change: change,
            code: ErrorCode.NotEnoughMoney
        };

    } else {
        const change = getChangeCoins(moneySubmitted - productPrice, missingCoins);
        if(change === false) {
            const change = sortDescending(coins);
            const data = {
                sell: false,
                change: change,
                code: ErrorCode.NoCoinsToGiveChange
            }
            return data;
        } else {
            const data = {
                sell: true,
                change: change,
                code: ErrorCode.AllGood
            }
            return data;
        }
    }
}

