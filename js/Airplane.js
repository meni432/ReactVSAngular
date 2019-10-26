import Coordinate from './Coordinate.js'
import MovementProvider from "./MovementProvider.js";

const UP_MARGIN = 10;
const MOVEMENT_DX = 1.25;
const MOVEMENT_DY = 0;

export default class Airplane {
    _movementProvider;

    constructor(airPlaneImageWidth, containerWeight) {
        const startPosition = new Coordinate(containerWeight, UP_MARGIN);
        const stopPosition = new Coordinate(-airPlaneImageWidth, UP_MARGIN);
        this._movementProvider = new MovementProvider(-MOVEMENT_DX, MOVEMENT_DY, startPosition, stopPosition);
    }

    getNextDrawingCoordinate() {
        return this._movementProvider.getNextMovement();
    }

    getCurrentCoordinate() {
        return this._movementProvider.getCurrentCoordinate();
    }
};