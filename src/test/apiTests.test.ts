const request = require("supertest");
const app = require("../index");


//It does not work :((
it('It should return product list', async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(201);
    expect(res.send).toBeCalledWith({ productNames: [{ name: 'Mars', price: 1.99 },
            { name: 'Snickers', price: 1.85 },
            { name: 'Cola', price: 1.33 },
            { name: 'Salted nuts', price: 2.50 },] });
});