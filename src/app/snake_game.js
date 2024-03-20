import {
    ARROW_DOWN_KEY,
    ARROW_LEFT_KEY,
    ARROW_RIGHT_KEY,
    ARROW_UP_KEY, BLOCK_SIZE,
    BORDER_RIGHT,
    BORDER_UP, DOWN, ENTER_KEY,
    LEFT,
    RIGHT,
    UP
} from "../constants.js";
import {move_snake, turn_snake} from "../core/snake.js";
import {check_border_collision} from "../core/game_area.js";


const snake_bloc = (x) => x * BLOCK_SIZE;



export const state = {
    snake_state: {
        direction: RIGHT,
        body: [
            {x: 15, y: 15},
            {x: 14, y: 15},
            {x: 13, y: 15},
            {x: 12, y: 15}
        ],
        died: false
    },
    apple_state: {position: null}
}

const canvas_setup = () => {
    const root_element = document.querySelector("#game");
    const canvas = document.createElement("canvas");
    canvas.width = BORDER_RIGHT;
    canvas.height = BORDER_UP;
    canvas.style.border = "3px solid black"
    root_element.appendChild(canvas);
    return canvas.getContext("2d");
}

const keyboard_setup = (ctx) => {
     window.addEventListener("keydown", (event) => {
        switch (event.key){
            case ARROW_RIGHT_KEY:
                state.snake_state = turn_snake(state.snake_state, RIGHT);
                break;
            case ARROW_LEFT_KEY:
                state.snake_state = turn_snake(state.snake_state, LEFT);
                break;
            case ARROW_UP_KEY:
                state.snake_state = turn_snake(state.snake_state, UP);
                break;
            case ARROW_DOWN_KEY:
                state.snake_state = turn_snake(state.snake_state, DOWN);
                break;
            case ENTER_KEY:
                launch_game(ctx);
                break;
            default: return;
        }
    })
}

const launch_game = (ctx) => {
    requestAnimationFrame(refresh_canvas(ctx))
}

const refresh_canvas = (ctx) => () => {
    ctx.clearRect(0, 0, BORDER_RIGHT, BORDER_UP);
    if(is_not_died_snake(state.snake_state)){
        draw_snake(state.snake_state.body, ctx)
        ctx.save();
        state.snake_state = move_snake(state.snake_state);
        state.snake_state = check_border_collision(state.snake_state);
        requestAnimationFrame(refresh_canvas(ctx));
    }else draw_snake(state.snake_state.body, ctx);

}

const draw_snake = (snake, ctx) => {
    const [head, ...body] = snake;
    draw_snake_head(head, ctx);
    draw_snake_body(body, ctx);
}

const draw_snake_head = (head, ctx) => {
    ctx.fillStyle = "red";
    ctx.fillRect(snake_bloc(head.x), snake_bloc(head.y), BLOCK_SIZE, BLOCK_SIZE);
}

const draw_snake_body = (body, ctx) => {
    ctx.fillStyle = "black";
    body.forEach(block => ctx.fillRect(snake_bloc(block.x), snake_bloc(block.y), BLOCK_SIZE, BLOCK_SIZE));
}

const is_not_died_snake = (snake_state) => !snake_state.died;

export const init = () => {
    const ctx = canvas_setup();
    keyboard_setup(ctx);
}
