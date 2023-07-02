import {products, sellProduct} from "../services/products";
import {Request, Response} from "express";
import {countMoney, formatAmount} from "../services/coins";

export function productsController(req: Request, res: Response) {
    console.log('Requested product list')
    res.status(201).send(products);
};


export function productsSellController(req: Request, res: Response)  {
    const moneySubmitted = countMoney(req.body.coins);

    let data = sellProduct(req.body.productName, req.body.coins);
    let message;
    if (data.sell) {
        message = `Here is your product ${(req.body.productName)} Money submitted is ${formatAmount(moneySubmitted)},`;
        res.status(400);
    }
    else {
        message = `Not enough money, product is ${req.body.productName} money submitted is ${formatAmount(moneySubmitted)},`;
        res.status(201);
    }

    res.json({
        sell: data.sell,
        change: data.change,
        message: message
    });
    };


module.exports = {productsController};
module.exports = {productsSellController};