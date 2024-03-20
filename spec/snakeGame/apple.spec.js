import {create_apple, is_bitten_by_snake} from "../../src/core/apple.js";

class PositionRandomizer {

    #firstCall = true;
    random_position(){
        if(this.#firstCall) {
            this.#firstCall = false;
            return {x: 14, y: 15}
        }
        return {x: 30, y: 30};
    }
}

describe("An Apple in the Game", () => {
    let apple_state;
    let position_randomizer;
    let apple_generator;

    beforeEach(() => {
        position_randomizer = new PositionRandomizer();
        apple_generator = create_apple(position_randomizer)
        apple_state = {position: null, eaten_event: null};
    })

    it("appears randomly somewhere in the game area", () => {
        const snake_body = [{x: 1, y: 1}, {x: 2, y: 1}];
        apple_state = create_apple(position_randomizer)(snake_body);
        expect(apple_state.position).toEqual({x: 14, y: 15})
    })

    it("cannot appears on the snake", () => {
        const snake_body =[{x: 15, y: 15}, {x: 14, y: 15}, {x: 13, y: 15}, {x: 12, y: 15}];
        apple_state = create_apple(position_randomizer)(snake_body);
        expect(apple_state.position).not.toEqual({x: 14, y: 15});
    });

    it("it re-appears somewhere else after been eaten", () => {
        let snake_body =[{x: 13, y: 15}, {x: 12, y: 15}, {x: 11, y: 15}, {x: 10, y: 15}];
        apple_state = create_apple(position_randomizer)(snake_body);
        snake_body =[{x: 14, y: 15}, {x: 13, y: 15}, {x: 12, y: 15}, {x: 11, y: 15}];
        apple_state = is_bitten_by_snake(apple_generator)(apple_state, snake_body);
        expect(apple_state.position).toEqual({x: 30, y: 30});
        expect(apple_state.eaten_event).toEqual(new Event("apple_eaten"));
    })
})