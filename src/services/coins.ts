
export const coinTypes = [100, 50, 20, 10, 5, 2, 1];

export function formatAmount(amount: number): string {
    return (amount / 100).toFixed(2);
}
export function countMoney(coins: string) {
    const coinArray = coins.split(' ').map((coin: string) => parseInt(coin));
    let total = coinArray.reduce((a: number, b: number) => a + b, 0);
    return total;
}

export function sortDescending(coins: string): string {
    const coinArray = coins.split(' ').map(Number);
    coinArray.sort((a, b) => b - a);
    return coinArray.join(' ');
}
export function getChangeCoins(change: number, missingCoins: number[]=[]) {
    let changeCoins = [];
    let changeLeft = change;

    for(let currentCoin of coinTypes) {
        let thisCoinsIsMissing = missingCoins.indexOf(currentCoin) >= 0;
        if (currentCoin > changeLeft || thisCoinsIsMissing) {
            continue;
        }

        let quantityOfCoinsToGive = Math.floor(changeLeft / currentCoin);

        for(let c = 0; c < quantityOfCoinsToGive; c++) {
            changeCoins.push(currentCoin);
        }
        changeLeft-= currentCoin * quantityOfCoinsToGive;
    }

    if(changeLeft > 0) {
        return false;
    } else {
        return changeCoins.join(' ');
    }
}