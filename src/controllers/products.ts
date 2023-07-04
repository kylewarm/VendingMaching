import {products, sellProduct} from "../services/products";
import {Request, Response} from "express";
import {countMoney, formatAmount, getMissingCoins} from "../services/coins";

export function productsController(req: Request, res: Response) {
    console.log('Requested product list')
    res.status(201).send(products);
};


export function productsSellController(req: Request, res: Response) {
    let message;
    const moneySubmitted = countMoney(req.body.coins);

    let data = sellProduct(req.body.productName, req.body.coins, getMissingCoins());
    if (data.sell) {
        message = `Here is your product ${(req.body.productName)} Money submitted is ${formatAmount(moneySubmitted)},`;
        res.status(201);
    } else {
        switch (data.code) {
            case 1:
                message = `You haven't provided product name. Here is your money: ${formatAmount(moneySubmitted)},`;
                break;
            case 2:
                message = `Product name ${req.body.productName} does not exist. Here is your money: ${formatAmount(moneySubmitted)},`;
                break;
            case 3:
                message = `Not enough money to buy ${req.body.productName}. Take back your pennies: ${formatAmount(moneySubmitted)},`;
                break;
            case 4:
                message = `Unfortunately we don't have coins to give change for ${req.body.productName}. Sorry. Here is your money: ${formatAmount(moneySubmitted)},`;
                break;
            case 5:
                message = `We sell ${req.body.productName} only for USD. Take your ${req.body.coins} back,`;
                break;
        }

        res.status(400);
    }

    res.json({
        sell: data.sell,
        change: data.change,
        message: message,
        code: data.code
    }).send();
}
;


module.exports = {productsController, productsSellController};