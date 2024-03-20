import {position_equal} from "./common.js";

export const create_apple = (positionRandomizer) => (snake_position) => {
    const apple_position = positionRandomizer.random_position();
    if(position_equal(apple_position, snake_position.head)) return create_apple(positionRandomizer)(snake_position);
    if(snake_position.body.some(pos => position_equal(pos, apple_position))) return create_apple(positionRandomizer)(snake_position);
    return {position: apple_position};
}

