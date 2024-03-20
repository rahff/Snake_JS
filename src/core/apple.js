import {position_equal} from "./common.js";

export const create_apple = (positionRandomizer) => (snake_body) => {
    const apple_position = positionRandomizer.random_position();
    if(snake_body.some(pos => position_equal(pos, apple_position))) return create_apple(positionRandomizer)(snake_body);
    return {position: apple_position};
}

