// @ts-ignore

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

export function sellProduct(productName: string, coins: string) {

    if (productName === null) { // ??
        const change = sortDescending(coins);
        const data = {
            sell: false,
            change: change,
            code: 1
        }
        return data; // ??
    }
    let productPrice = getPrice(productName);
    const moneySubmitted = countMoney(coins);

    if (isNaN(moneySubmitted)) {
        const data = {
            sell: false,
            change: coins,
            code: 5
        };
        return data;
    }

    if (!productPrice) {
        const change = sortDescending(coins);
        const data = {
            sell: false,
            change: change,
            code: 2
        };
        return data;
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
        const change = getChangeCoins(moneySubmitted - productPrice);
        if(change === false) {
            const change = sortDescending(coins);
            const data = {
                sell: false,
                change: change,
                code: 4
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

