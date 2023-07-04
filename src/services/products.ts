// @ts-ignore

enum ErrorCode {
    Up = 1,
    Down,
    Left,
    NoCoinsToGiveChange = 4,
  }

import {countMoney, formatAmount, getChangeCoins, sortDescending} from "./coins";

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
            code: 1
        };
    }
    let productPrice = getPrice(productName);
    const moneySubmitted = countMoney(coins);

    if (!moneySubmitted) {
        return  {
            sell: false,
            change: coins,
            code: 5
        };;
    }

    if (!productPrice) {
        const change = sortDescending(coins);

        return {
            sell: false,
            change: change,
            code: 2
        };
    }

    productPrice *= 100;

    if (moneySubmitted < productPrice) {
        // const change = ranged(req.body.coins);
        const change = sortDescending(coins);
        const data = {
            sell: false,
            change: change,
            code: 3
        }
        return data;

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
                code: 0
            }
            return data;
        }
    }
}

