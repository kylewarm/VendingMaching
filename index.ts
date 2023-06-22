import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { count } from 'console';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below. 
app.use(bodyParser.urlencoded({ extended: true }));

const products = {
  productNames: [
    { name: 'Mars', price: 1.99 },
    { name: 'Snickers', price: 1.85 },
    { name: 'Cola', price: 1.33 },
    { name: 'Salted nuts', price: 2.50 },
  ]
};

const coinTypes = [100, 50, 20, 10, 5, 2, 1];

function getPrice(productName: string) {
  const product = products.productNames.find((product) => product.name === productName);
  return product?.price;
}

function countMoney(coins: string) {
  const coinArray = coins.split(' ').map((coin: string) => parseInt(coin));
  const total = coinArray.reduce((a: number, b: number) => a + b, 0);
  return total;
}

function sortDescending(coins: string): string {
  const coinArray = coins.split(' ').map(Number);
  coinArray.sort((a, b) => b - a);
  return coinArray.join(' ');
}

function getChangeCoins(change: number) {
  const changeCoins = [];
  let changeLeft = change;
  for (let i = 0; i < coinTypes.length; i++) {
    const coinType = coinTypes[i];
    while (changeLeft >= coinType) {
      changeCoins.push(coinType);
      changeLeft = changeLeft - coinType;
    }
  }
  return changeCoins.join(' ');
}

function formatAmount(amount: number): string {
  return (amount / 100).toFixed(2);
}


app.get('/', (req: Request, res: Response) => {
  res.send(products);
});


app.post('/sell', (req: Request, res: Response) => {
  const productPrice = parseFloat(getPrice(req.body.productName))*100;
  const moneySubmitted =countMoney(req.body.coins);

  if (moneySubmitted < productPrice) {
    // const change = ranged(req.body.coins);
    const change = sortDescending(req.body.coins);
    const data = {
      message: `Not enough money, product is ${req.body.productName}, product price is ${formatAmount(productPrice)}, money submitted is ${formatAmount(moneySubmitted)},`,
      change: change,
    };
    res.json(data);
  }
  else {
    const change = getChangeCoins(moneySubmitted - productPrice);
    const data = {
      message: `Here is your product ${(req.body.productName)}, Product price is ${formatAmount(productPrice)}, Money submitted is ${formatAmount(moneySubmitted}`,
      change: change,
    };
    res.json(data);
  };
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});