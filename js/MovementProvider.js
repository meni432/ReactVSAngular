import Coordinate from './Coordinate.js'

export const EndWayStrategy = Object.freeze({"CYCLIC": 1, "STOP": 2});

export default class MovementProvider {
    _directiveCoordinate;
    _startPosition;
    _endPosition;
    _currentDrawingCoordinate;
    _endWayStrategy;
    _isStopped;

    constructor(dx, dy, startPosition, endPosition, endWayStrategy = EndWayStrategy.CYCLIC) {
        this._directiveCoordinate = new Coordinate(dx, dy);
        this._startPosition = startPosition;
        this._endPosition = endPosition;
        this._currentDrawingCoordinate = new Coordinate(startPosition.x, startPosition.y);
        this._endWayStrategy = endWayStrategy;
        this._isStopped = false;
    }

    getNextMovement() {
        const DX_SIGN_POSITIVE = Math.sign(this._directiveCoordinate.x) >= 0;
        const DY_SIGN_POSITIVE = Math.sign(this._directiveCoordinate.y) >= 0;

        if (!this._isStopped) {
            this._currentDrawingCoordinate.plus(this._directiveCoordinate);
            if ((this._currentDrawingCoordinate.x > this._endPosition.x && DX_SIGN_POSITIVE)
                || (this._currentDrawingCoordinate.y > this._endPosition.y && DY_SIGN_POSITIVE)
                || (this._currentDrawingCoordinate.x < this._endPosition.x && !DX_SIGN_POSITIVE)
                || (this._currentDrawingCoordinate.y < this._endPosition.y && !DY_SIGN_POSITIVE)) {
                if (this._endWayStrategy === EndWayStrategy.CYCLIC) {
                    this._currentDrawingCoordinate.set(this._startPosition);
                } else {
                    this._isStopped = true;
                }
            }
        }

        return this._currentDrawingCoordinate;
    }

    getCurrentCoordinate() {
        return this._currentDrawingCoordinate;
    }


    get isStopped() {
        return this._isStopped;
    }
}