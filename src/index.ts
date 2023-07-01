import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import {count} from 'console';
import {getPrice, products, sellProduct} from './services/products';
import {countMoney, formatAmount, getChangeCoins, sortDescending} from "./services/coins";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below. 
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req: Request, res: Response) => {
    res.send(products);
});


app.post('/sell', (req: Request, res: Response) => {

    const moneySubmitted = countMoney(req.body.coins);

    let data = sellProduct(req.body.productName, req.body.coins);
    let message;
    if (data.sell) {
        message = `Here is your product ${(req.body.productName)} Money submitted is ${formatAmount(moneySubmitted)},`;
    }
    else {
        message = `Not enough money, product is ${req.body.productName} money submitted is ${formatAmount(moneySubmitted)},`;
    }

    res.json({
        sell: data.sell,
        change: data.change,
        message: message
    });

});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});