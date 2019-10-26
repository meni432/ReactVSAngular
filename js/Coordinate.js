export default class Coordinate {
    _x;
    _y;

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    set x(newX) {
        this._x = newX;
    }

    set y(newY) {
        this._y = newY;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    plus(coordinate) {
        this._x += coordinate.x;
        this._y += coordinate.y;
    }

    set(coordinate) {
        this._x = coordinate.x;
        this._y = coordinate.y;
    }

    equals(coordinate) {
        return this._x === coordinate.x && this._y === coordinate.y;
    }
}