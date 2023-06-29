
import { Direction, type DirectionOptions } from '../src/';

describe('Direction', () => {
    describe("constructor", () => {
        it("accepts standard numbers (0-360°)", () => {
            for (let i = 0; i < 360; i++) {
                const dir42 = new Direction(i);
                expect(dir42.degrees).toBe(i);
            }
        });
        it("accepts direction strings (e.g., 'SW')", () => {
            const dirNW = new Direction("NW");
            expect(dirNW.degrees).toBe(315); // 360 - 45
        });
        it("accepts other Direction objects (without referencing issues)", () => {
            const dir = new Direction("NE");
            const dir2 = new Direction(dir);
            dir.rotate(45); //Rotate first dir to make sure dir2 is not affected
            expect(dir2.degrees).toBe(45);
        })
    })
    describe('degrees', () => {
        it('should return the direction in degrees', () => {
            const direction = new Direction('NW');
            expect(direction.degrees).toBe(315);
        });
        it("should return null when direction is invalid", () => {
            const direction = new Direction('InvalidDirection');
            expect(direction.degrees).toBeNull();
        });
        it("should standardise degrees >= 360° to (0-360°)", () => {
            for (let i = 360; i < 720; i++) {
                const dir = new Direction(i);
                expect(dir.degrees).toBe(i - 360);
            }
        });
        it("should standardise degrees < 0° to (0-360°)", () => {
            for (let i = -360; i < 0; i++) {
                const dir = new Direction(i);
                expect(dir.degrees).toBe(i + 360);
            }
        });
    });
    describe('abbreviations (e.g., "NE")', () => {
        it('should return the direction symbol closest to the direction in degrees', () => {
            const direction = new Direction(42); //not quite 45°, but should return NE since that's closest
            expect(direction.symbol).toBe('NE');
        });
        it('should return null when direction is invalid', () => {
            const direction = new Direction('InvalidDirection');
            expect(direction.symbol).toBeNull();
        });
    });
    describe("options", () => {
        describe("compassPoints option", () => {
            it('should use 8 as the default number of compass points', () => {
                const direction = new Direction(115); //This would be ESE in 16-point compass
                expect(direction.symbol).toBe('SE');
            });
            it('should work for 16-point compass', () => {
                const options: DirectionOptions = {
                    compassPoints: 16,
                };
                const direction = new Direction(121, options);
                expect(direction.symbol).toBe('ESE');
            });
            it('should work for 16-point compass #2', () => {
                const options: DirectionOptions = {
                    compassPoints: 16,
                };
                const direction = new Direction(77, options);
                expect(direction.symbol).toBe('ENE');
            });
            it('should work for 4-point compass', () => {
                const options: DirectionOptions = {
                    compassPoints: 4,
                };
                const direction = new Direction(58, options);
                expect(direction.symbol).toBe('E');
            });
        });
    });
    //Tests for Direction.getAbsoluteDifference
    describe("getAbsoluteDifference", () => {
        it("should return the absolute difference between two directions", () => {
            const dir1 = new Direction("NW");
            const dir2 = new Direction("NE");
            expect(Direction.getAbsoluteDifference(dir1, dir2)).toBe(90);
        });
    });
});

