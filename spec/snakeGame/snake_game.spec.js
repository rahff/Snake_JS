import {feed_snake, move_snake, turn_snake} from "../../src/core/snake.js";
import {BLOCK_SIZE, DOWN, LEFT, RIGHT, UP} from "../../src/constants.js";
import {} from "../../src/core/common.js";

describe('A Snake in the Game', () => {
    let snakeState;

    beforeEach(() => {
        snakeState = {
            direction: RIGHT,
            body: [
                {x: 15, y: 10},
                {x: 14, y: 10},
                {x: 13, y: 10},
                {x: 12, y: 10}
            ],
            died: false
        }
    })

    it("moves forward", () => {
        snakeState = move_snake(snakeState);
        expect(snakeState.body).toEqual([
            {x: 16, y: 10},
            {x: 15, y: 10},
            {x: 14, y: 10},
            {x: 13, y: 10}
        ]);
    })

    it("can change its direction", () => {
        snakeState = turn_snake(snakeState, UP);
        expect(snakeState.direction).toEqual(UP);
    })

    it("moves forward its new direction", () => {
        snakeState = turn_snake(snakeState, UP);
        snakeState = move_snake(snakeState);
        expect(snakeState.body).toEqual([
            {x: 15, y: 9},
            {x: 15, y: 10},
            {x: 14, y: 10},
            {x: 13, y: 10}
        ]);
        snakeState = turn_snake(snakeState, LEFT);
        snakeState = move_snake(snakeState);
        expect(snakeState.body).toEqual([
            {x: 14, y: 9},
            {x: 15, y: 9},
            {x: 15, y: 10},
            {x: 14, y: 10}
        ]);
    });

    it("cannot moves backward", () => {
        snakeState = turn_snake(snakeState, UP);
        snakeState = turn_snake(snakeState, DOWN);
        expect(snakeState.direction).toEqual(UP);
        snakeState = turn_snake(snakeState, RIGHT);
        snakeState = turn_snake(snakeState, LEFT);
        expect(snakeState.direction).toEqual(RIGHT);
    });

    it("growths when eat an apple", () => {
        snakeState = feed_snake(snakeState);
        expect(snakeState.body).toEqual([
            {x: 15, y: 10},
            {x: 14, y: 10},
            {x: 13, y: 10},
            {x: 12, y: 10},
            {x: 11, y: 10}
        ])
    });

    it("died if its head hit its body", () => {
        snakeState = feed_snake(snakeState);
        snakeState = turn_snake(snakeState, UP);
        snakeState = move_snake(snakeState);
        snakeState = turn_snake(snakeState, LEFT);
        snakeState = move_snake(snakeState);
        snakeState = turn_snake(snakeState, DOWN);
        snakeState = move_snake(snakeState);
        expect(snakeState.died).toBeTrue();
    })
});