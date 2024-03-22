import {DOWN, LEFT, opposite_directions, RIGHT, UP} from "../constants.js";
import {position_equal} from "./common.js";

export const move_snake = (snake_state) =>  {
    const head = get_head_position(snake_state.direction, {...snake_state.body[0]});
    const body = snake_state.body.slice(0, -1);
    return {
        ...snake_state,
        body: [head, ...body],
        died: body.some(pos => position_equal(pos, head))
    }
}



const get_head_position = (direction, position) => {
    switch (direction) {
        case RIGHT:
            return {...position, x: ++position.x};
        case UP:
            return {...position, y: --position.y};
        case LEFT:
            return {...position, x: --position.x};
        case DOWN:
            return {...position, y: ++position.y};
    }
}

export const turn_snake = (snake_state, new_direction) => {
    return {
        ...snake_state,
        direction: change_direction(snake_state.direction, new_direction)
    }
}


const change_direction = (old_direction, new_direction) => {
    if(opposite_directions[old_direction] === new_direction){
        return old_direction;
    }
    return new_direction;
}

export const feed_snake = (snake_state) => {
    const snake_tail = {...snake_state.body[snake_state.body.length - 1]};
    return {
        ...snake_state,
        body: [...snake_state.body, tail_position(snake_tail, snake_state.direction)]
    }
}

const tail_position = (tail, direction) => {
    switch (direction) {
        case RIGHT:
            return {...tail, x: --tail.x};
        case UP:
            return {...tail, y: --tail.y};
        case LEFT:
            return {...tail, x: ++tail.x};
        case DOWN:
            return {...tail, y: ++tail.y};
    }
}
