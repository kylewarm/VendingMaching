const request = require("supertest");
const products = require('../controllers/products');
const app = require("../index");


//It does not work :((

it('It should return product list', async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(201);
    expect(res.text).toContain(JSON.stringify({
            productNames: [
                {name: 'Mars', price: 1.99},
                {name: 'Snickers', price: 1.85},
                {name: 'Cola', price: 1.33},
                {name: 'Salted nuts', price: 2.50},
            ]
        })
    );
});

it('It sets and returns missing coins', async () => {
    const reqBody = {coins: "100 50 2"}
    const res = await request(app).post("/missingCoins").send(reqBody).expect(201);
    //expect(res.statusCode).toBe(201);
    const res2 = await request(app).get("/missingCoins");
    expect(res2.text).toContain(JSON.stringify(
        {coins: "100 50 2"})
    );
});

it('It sell product if I have enough money', async () => {
    const reqBody = {productName: "Mars", coins: "100 50 20 20 5 2 2"}
    const res = await request(app).post("/sell").send(reqBody);
    expect(res.statusCode).toBe(201);
    expect(res.text).toContain(JSON.stringify(
        {sell: true, change: "", message: "Here is your product Mars Money submitted is 1.99,", code: 0})
    );
});

it('It sell product and gives change if I prodvide more money than needed', async () => {
    const reqBody = {productName: "Snickers", coins: "100 100 100"}
    const res = await request(app).post("/sell").send(reqBody);
    expect(res.statusCode).toBe(201);
    expect(res.text).toContain(JSON.stringify(
        {sell: true, change: "20 20 20 20 20 10 5", message: "Here is your product Snickers Money submitted is 3.00,", code: 0})
    );
});

it('It does not sell product, if I provided too little money', async () => {
    const reqBody = {productName: "Snickers", coins: "100"}
    const res = await request(app).post("/sell").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.text).toContain(JSON.stringify(
        {
            sell: false,
            change: "100",
            message: "Not enough money to buy Snickers. Take back your pennies: 1.00,",
            code: 3
        })
    );
});

it('It does not sell product, if it cannot give the change', async () => {
    const coinsBody = {coins: "100 50 1"}
    await request(app).post("/missingCoins").send(coinsBody).expect(201);
    const reqBody = {productName: "Mars", coins: "100 100"}
    const res = await request(app).post("/sell").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.text).toContain(JSON.stringify(
        {
            sell: false,
            change: "100 100",
            message: "Unfortunately we don't have coins to give change for Mars. Sorry. Here is your money: 2.00,",
            code: 4
        })
    );
});
it('It does not sell product, if I gave incorrect money value', async () => {
    const reqBody = {productName: "Cola", coins: "50 Intergalactic credits"}
    const res = await request(app).post("/sell").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.text).toContain(JSON.stringify(
        {
            sell: false,
            change: "50 Intergalactic credits",
            message: "We sell Cola only for USD. Take your 50 Intergalactic credits back,",
            code: 5
        })
    );
});

it('It does not sell product, if it cannot find it', async () => {
    const reqBody = {productName: "Nuka Cola", coins: "100 100"}
    const res = await request(app).post("/sell").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.text).toContain(JSON.stringify(
        {
            sell: false,
            change: "100 100",
            message: "Product name Nuka Cola does not exist. Here is your money: 2.00,",
            code: 2
        })
    );
});

it('It does not sell product, if no product provided', async () => {
    const reqBody = {productName: "", coins: "100 100"}
    const res = await request(app).post("/sell").send(reqBody);
    expect(res.statusCode).toBe(400);
    expect(res.text).toContain(JSON.stringify(
        {
            sell: false,
            change: "100 100",
            message: "You haven't provided product name. Here is your money: 2.00,",
            code: 1
        })
    );
});

export {}