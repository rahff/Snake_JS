import {
    BORDER_DOWN,
    BORDER_LEFT,
    BORDER_RIGHT_BLOCK,
    BORDER_UP_BLOCK
} from "../constants.js";


export const check_border_collision = (snake_state) => {
    const snake_head = {...snake_state.body[0]};

    return {
        ...snake_state,
        died: killIfOnTheBorder(snake_head)
    }
}

const killIfOnTheBorder = (snake_head) => {
    return snake_head.x >= (BORDER_RIGHT_BLOCK - 1) ||
           snake_head.x <= BORDER_LEFT ||
           snake_head.y >= (BORDER_UP_BLOCK - 1) ||
           snake_head.y <= BORDER_DOWN;
}