import {Request, Response} from "express";
import {getMissingCoins, setMissingCoins} from "../services/coins";

export function coinsSetMissingController(req: Request, res: Response) {
    setMissingCoins(req.body.coins);
    res.status(201).send();
};

export function coinsGetMissingController(req: Request, res: Response) {
    const coins = getMissingCoins().join(' ');
    res.status(201).send({coins: coins});
};

module.exports = {coinsSetMissingController, coinsGetMissingController};