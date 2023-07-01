
export const coinTypes = [100, 50, 20, 10, 5, 2, 1];
 let missingCoins = [100, 50, 1];


export function setMissingCoins(coins: number[]): void {
    missingCoins = coins;
}

export function formatAmount(amount: number): string {
    return (amount / 100).toFixed(2);
}
export function countMoney(coins: string) {
    const coinArray = coins.split(' ').map((coin: string) => parseInt(coin));
    const total = coinArray.reduce((a: number, b: number) => a + b, 0);
    return total;
}

export function sortDescending(coins: string): string {
    const coinArray = coins.split(' ').map(Number);
    coinArray.sort((a, b) => b - a);
    return coinArray.join(' ');
}
export function getChangeCoins(change: number) {
    let changeCoins = [];
    let changeLeft = change;

    for(let coin of coinTypes) {
        let coinMaxQ = missingCoins.indexOf(coin) >= 0;
        if (coin > changeLeft || coinMaxQ) {
            continue;
        }

        let coinQ = Math.floor(changeLeft / coin);

        for(let c = 0; c < coinQ; c++) {
            changeCoins.push(coin);
        }
        changeLeft-= coin * coinQ;
    }

    if(changeLeft > 0) {
        return false;
    } else {
        return changeCoins.join(' ');
    }
}