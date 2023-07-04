import { products, sellProduct } from '../services/products';
import { Request, Response } from 'express';
import { countMoney, formatAmount } from '../services/coins';


let missingCoins = [100, 50, 1];

export function productsController(req: Request, res: Response) {
	console.log('Requested product list');
	res.status(201).send(products);
}

export function productsSellController(req: Request, res: Response) {
	let message;
	const moneySubmitted = countMoney(req.body.coins);

	let data = sellProduct(req.body.productName, req.body.coins, missingCoins);
	if (data.sell) {
		message = `Here is your product ${req.body.productName} Money submitted is ${formatAmount(moneySubmitted)},`;
		res.status(201);
	} else {
		//switch
		if (data.code == 1) {
			message = `You haven't provided product name. Here is your money: ${formatAmount(moneySubmitted)},`;
		}
		if (data.code == 2) {
			message = `Product name ${req.body.productName} does not exist. Here is your money: ${formatAmount(
				moneySubmitted
			)},`;
		}
		if (data.code == 3) {
			message = `Not enough money to buy ${req.body.productName}. Take back your pennies: ${formatAmount(
				moneySubmitted
			)},`;
		}
		if (data.code == 4) {
			message = `Unfortunately we don't have coins to give change for ${
				req.body.productName
			}. Sorry. Here is your money: ${formatAmount(moneySubmitted)},`;
		}
		if (data.code == 5) {
			message = `We sell ${req.body.productName} only for USD. Take your ${req.body.coins} back,`;
		}
		res.status(400);
	}

	res.json({
		sell: data.sell,
		change: data.change,
		message: message,
		code: data.code
	});
}

module.exports = { productsController, productsSellController };
