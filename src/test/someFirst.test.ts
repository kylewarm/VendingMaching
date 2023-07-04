import {getPrice, sellProduct} from "../services/products";
import {getChangeCoins} from "../services/coins";

test('Should return list of coins for change in case all coins present', () => {
    //expect(1).toBe(1);
    expect(getChangeCoins(188)).toBe('100 50 20 10 5 2 1');
});

test('Should return list of coins for change in case some of the coins are missing', () => {
    //expect(1).toBe(1);
    expect(getChangeCoins(178, [100, 50, 10, 2])).toBe('20 20 20 20 20 20 20 20 5 5 5 1 1 1');
});

test('Should return false if change cannot be returned in case of missing coins', () => {
    //expect(1).toBe(1);
    expect(getChangeCoins(178, [100, 50, 10, 2, 1])).toBe(false);
});

test('Should return blank change if no change is needed', () => {
    //expect(1).toBe(1);
    expect(getChangeCoins(0)).toBe('');
});


test('Should get product price', () => {
    //expect(1).toBe(1);
    expect(getPrice('Mars')).toBe(1.99);
});


test('Should return true to sell product without change', () => {
    //expect(1).toBe(1);
    expect(sellProduct("Mars", "100 50 20 20 5 2 2")).toStrictEqual({sell: true, change: "", code: 0});
});

test('Should return true to sell product and return change', () => {
    //expect(1).toBe(1);
    expect(sellProduct("Mars", "100 50 20 50 20 10")).toStrictEqual({sell: true, change: "50 1", code: 0});
});


test('Should return false to sell product', () => {
    //expect(1).toBe(1);
    expect(sellProduct("Mars", "50 2 1")).toStrictEqual({sell: false, change: "50 2 1", code: 3});
});

test('Should sell the product if some of the coins are missing for change', () => {
    //expect(1).toBe(1);
    expect(sellProduct("Cola", "100 50 20 20", [50, 10, 2])).toStrictEqual({sell: true, change: "20 20 5 5 5 1 1", code: 0});
});

test('Should return false to set product and return all the money if change cannot be produced', () => {
    //expect(1).toBe(1);
    expect(sellProduct("Cola", "100 50 20 20", [50, 10, 2, 1])).toStrictEqual({sell: false, change: "100 50 20 20", code: 4});
});

test('Should return false to sell product and return all the money if product does not exist', () => {
    //expect(1).toBe(1);
    expect(sellProduct("Nuka Cola", "100 50 20 20", [50, 10, 2, 1])).toStrictEqual({sell: false, change: "100 50 20 20", code: 2});
});

test('Should return false to sell product if user provided incorrect money string', () => {
    //expect(1).toBe(1);
    expect(sellProduct("Cola", "fsddeg")).toStrictEqual({sell: false, change: "fsddeg", code: 5});
});


