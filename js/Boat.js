import MovementProvider, {EndWayStrategy} from "./MovementProvider.js";
import Coordinate from "./Coordinate.js";

const MOVEMENT_DX = 1.5;
const MOVEMENT_DY = 0;

const BOAT_Y_POSITION = 485;

const DIRECTIVE_SIGN_PLUS = 1;
const DIRECTIVE_SIGN_MINUS = -1;

export class Boat {
    _boatPlaneImageWidth;
    _containerWeight;
    _movementProvider;

    constructor(boatImageWidth, containerWeight) {
        this._boatPlaneImageWidth = boatImageWidth;
        this._containerWeight = containerWeight;
        const startPosition = new Coordinate(containerWeight / 2 - this._boatPlaneImageWidth / 2, BOAT_Y_POSITION);
        this._movementProvider = new MovementProvider(MOVEMENT_DX, MOVEMENT_DY, startPosition, startPosition, EndWayStrategy.STOP);
    }

    moveTo(x) {
        const targetPosition = new Coordinate(x - this._boatPlaneImageWidth / 2, BOAT_Y_POSITION);
        const currentPosition = this._movementProvider.getCurrentCoordinate();
        const nextMovementDX = targetPosition.x > currentPosition.x ? MOVEMENT_DX * DIRECTIVE_SIGN_PLUS : MOVEMENT_DX * DIRECTIVE_SIGN_MINUS;
        this._movementProvider = new MovementProvider(nextMovementDX, MOVEMENT_DY, currentPosition, targetPosition, EndWayStrategy.STOP);
    }

    getNextDrawingCoordinate() {
        return this._movementProvider.getNextMovement();
    }

    getCurrentCoordinate() {
        return this._movementProvider.getCurrentCoordinate();
    }
}