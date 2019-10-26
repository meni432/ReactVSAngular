import {ParachutistType} from "./Parachutist.js";

const INITIAL_LIVES = 3;
const INITIAL_SCORE = 0;
const SCORE_BONUS = 10;

export class GameManager {
    _angular;
    _react;
    _lives;

    constructor() {
        this._lives = INITIAL_LIVES;
        this._angular = INITIAL_SCORE;
        this._react = INITIAL_SCORE;
    }

    isAlive() {
        return this._lives > 0;
    }

    get lives() {
        return this._lives;
    }

    get angular() {
        return this._angular;
    }

    get react() {
        return this._react;
    }

    handleInABoatArea(parachutistType) {
        switch (parachutistType) {
            case ParachutistType.ANGULAR:
                this._angular++;
                break;

            case ParachutistType.REACT:
                this._react++;
                break;

            case ParachutistType.SALAD:
                this._lives++;
                break;

            default:
                break;
        }
    }

    handleParachutistFallToWater(parachutistType) {
        switch (parachutistType) {
            case ParachutistType.ANGULAR:
                break;

            case ParachutistType.REACT:
                break;

            case ParachutistType.SALAD:
                this._lives--;
                break;

            default:
                break;
        }
    }
}
