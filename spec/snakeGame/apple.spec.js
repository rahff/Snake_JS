import {create_apple} from "../../src/core/apple.js";

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

    beforeEach(() => {
        position_randomizer = new PositionRandomizer()
        apple_state = {position: null};
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
    })
})