import {apple_initial_state, DOWN, snake_initial_state} from "../../src/constants.js";
import {check_border_collision} from "../../src/core/game_area.js";

describe('The Game Area', () => {
    let snake_state;
    beforeEach(() => {
        snake_state = {...snake_initial_state, body: [{x: 29, y: 15}, {x: 28, y: 15}, {x: 27, y: 15}]};
    })

    it("kill the snake if its head collide the border of area", () => {
        snake_state = check_border_collision(snake_state);
        expect(snake_state.died).toBeTrue();
        snake_state = {...snake_initial_state, body: [{x: 15, y: 0}, {x: 15, y: 1}, {x: 15, y: 2}], direction: DOWN}
        snake_state = check_border_collision(snake_state);
        expect(snake_state.died).toBeTrue();
    })
});