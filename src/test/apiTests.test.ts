import {sellProduct} from "../services/products";

const request = require("supertest");
const app = require("../app");

it('It should return product list', async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
});