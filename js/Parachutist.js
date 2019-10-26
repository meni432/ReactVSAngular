
import MovementProvider, {EndWayStrategy} from "./MovementProvider.js";

export const ParachutistType = Object.freeze({"REACT": 1, "ANGULAR": 2, "SALAD" : 3});
export const SpeedParameters = Object.freeze({"REGULAR": 1, "FAST": 1.5, "VERY_FAST" : 2});

const MOVEMENT_DX = 0;
const MOVEMENT_DY = 1;

export class Parachutist {
    _movementProvider;
    _parachutistType;

    constructor(startCoordinate, stopCoordinate, parachutistType = ParachutistType.REACT, speedParameters = SpeedParameters.REGULAR) {
        this._movementProvider = new MovementProvider(MOVEMENT_DX * speedParameters, MOVEMENT_DY * speedParameters, startCoordinate, stopCoordinate, EndWayStrategy.STOP);
        this._parachutistType = parachutistType;
    }

    getNextDrawingCoordinate() {
        return this._movementProvider.getNextMovement();
    }

    stop() {

    }

    get isStopped() {
        return this._movementProvider.isStopped
    }

    get parachutistType() {
        return this._parachutistType;
    }
}