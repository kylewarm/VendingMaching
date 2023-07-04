import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import {productsController, productsSellController} from "./controllers/products";
import {coinsGetMissingController, coinsSetMissingController } from './controllers/coins';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below. 
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', productsController);

app.post('/sell',productsSellController);

app.post('/missingCoins',coinsSetMissingController);

app.get('/missingCoins',coinsGetMissingController);


let appServer = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

afterAll(() => {
    appServer.close()
})

module.exports = app;