import {getPrice, sellProduct} from "../services/products";
import {getChangeCoins, setMissingCoins} from "../services/coins";

test('Should return list of coins for change in case all coins present', () => {
    //expect(1).toBe(1);
    setMissingCoins([]);
    expect(getChangeCoins(188)).toBe('100 50 20 10 5 2 1');
});

test('Should return list of coins for change in case some of the coins are missing', () => {
    //expect(1).toBe(1);
    setMissingCoins([100, 50, 10, 2]);
    expect(getChangeCoins(178)).toBe('20 20 20 20 20 20 20 20 5 5 5 1 1 1');
});

test('Should return false if change cannot be returned in case of missing coins', () => {
    //expect(1).toBe(1);
    setMissingCoins([100, 50, 10, 2, 1]);
    expect(getChangeCoins(178)).toBe(false);
});


test('Should get product price', () => {
    //expect(1).toBe(1);
    expect(getPrice('Mars')).toBe(1.99);
});


test('Should return true to sell product', () => {
    //expect(1).toBe(1);
    setMissingCoins([]);
    expect(sellProduct("Mars", "100 50 20 50 20 10")).toStrictEqual({sell: true, change: "50 1"});
});


test('Should return false to sell product', () => {
    //expect(1).toBe(1);
    setMissingCoins([]);
    expect(sellProduct("Mars", "50 2 1")).toStrictEqual({sell: false, change: "50 2 1"});
});

test('Should sell the product if some of the coins are missing for change', () => {
    //expect(1).toBe(1);
    setMissingCoins([50, 10, 2]);
    expect(sellProduct("Cola", "100 50 20 20")).toStrictEqual({sell: true, change: "20 20 5 5 5 1 1"});
});

test('Should return false to set product and return all the money if change cannot be produced', () => {
    //expect(1).toBe(1);
    setMissingCoins([50, 10, 2, 1]);
    expect(sellProduct("Cola", "100 50 20 20")).toStrictEqual({sell: false, change: "100 50 20 20"});
});


