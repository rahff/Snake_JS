import {position_equal} from "./common.js";
import {APPLE_EATEN_EVENT} from "../constants.js";

export const create_apple = (positionRandomizer) => (snake_body) => {
    const apple_position = positionRandomizer.random_position();
    if(snake_body.some(pos => position_equal(pos, apple_position))) return create_apple(positionRandomizer)(snake_body);
    return {
        eaten_event: null,
        position: apple_position
    };
}

export const is_bitten_by_snake = (apple_generator) => (apple_state, snake_body) => {
    const snake_head = {...snake_body[0]}
    if(position_equal(apple_state.position, snake_head)) {
        return {...apple_generator(snake_body),  eaten_event:  new Event(APPLE_EATEN_EVENT)};
    }
    return apple_state;
}

