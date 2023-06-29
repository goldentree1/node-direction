export interface DirectionOptions {
    /**The number of symbols to use 
     * @example 4 for N, E, S, W,
     * @example 8 for N, NE, E, SE, S, SW, W, NW
     * @default 8 */
    compassPoints?: 4 | 8 | 16,
}

const dirIncr16 = 11.25;
const dirIncr8 = 22.5;
const dirIncr4 = 45;
const directions = new Map([
    ["N", 0],
    ["NNE", 22.5],
    ["NE", 45],
    ["ENE", 67.5],
    ["E", 90],
    ["ESE", 112.5],
    ["SE", 135],
    ["SSE", 157.5],
    ["S", 180],
    ["SSW", 202.5],
    ["SW", 225],
    ["W", 270],
    ["WSW", 247.5],
    ["WNW", 292.5],
    ["NW", 315],
    ["NNW", 337.5],
] as const)


/** A compass direction. Can be initialised with degrees or a direction symbol.
 * @example
 * new Direction("NE").direction // 45
 * @example 
 * new Direction(183).symbol // 'S' (183° is closest to south)
 */
export class Direction {

    private _degrees:number|null;
    private _opts;

    constructor(
        direction: number | string | Direction,
        opts?: DirectionOptions
    ) {
        //Set degrees
        switch (typeof direction) {
            case 'number':
                //Convert values to standard range (i.e., 0 - 360)
                while (direction >= 360) direction -= 360;
                while (direction < 0) direction += 360;
                this._degrees = direction;
                break;
            case 'string':
                //@ts-expect-error - TS doesn't like calling .toUpperCase() on a string literal
                const degrees = directions.get(direction.toUpperCase());
                if (degrees) {
                    this._degrees = degrees;
                    break;
                }
            default:
                this._degrees = null;
                if (direction instanceof Direction) {
                    this._degrees = direction.degrees;
                }
        }

        //Set options
        this._opts = opts || {};
        if (!this._opts.compassPoints) this._opts.compassPoints = 8;
    }

    /**
     * @returns the direction in degrees
     * @example new Direction('NW').degrees // 315 */
    get degrees() {
        return this._degrees;
    }

    /**
     * @returns the direction symbol closest to the direction in degrees
     * @example new Direction(42).symbol // 'NE'*/
    get symbol() {
        if (!this._degrees) return null;

        let dirsFiltered = Array.from(directions.entries()).filter((_, i) => i % 2 === 0)
        let degreesIncrement = dirIncr8; //default 8-point compass
        if (this._opts.compassPoints === 4) {
            degreesIncrement = dirIncr4;
            dirsFiltered = Array.from(directions.entries()).filter((_, i) => i % 4 === 0);
        }
        if (this._opts.compassPoints === 16) {
            degreesIncrement = dirIncr16;
            dirsFiltered = Array.from(directions.entries());
        }

        if (//North special case
            this._degrees + degreesIncrement >= 360
            || this._degrees - degreesIncrement < 0
        ) {
            return "N";
        }

        //Other directions
        for (const [sym, degrees] of dirsFiltered) {
            if (
                this._degrees < degrees + degreesIncrement
                && this._degrees > degrees - degreesIncrement
            ) {
                return sym;
            }
        }
        return null;
    }

    /**Rotate this direction by given degrees */
    rotate(degrees: number) {
        if (this._degrees) this._degrees += degrees;
    }
}
