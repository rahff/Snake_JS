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
import {position_randomizer} from "./position_randomizer.js";
import {create_apple} from "../core/apple.js";
import {draw_snake, draw_apple} from "./drawing.js";


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
    apple_state: {position: null},
    speed: 120,
    interval: 0
}

const canvas_setup = () => {
    const root_element = document.querySelector("#game");
    const canvas = document.createElement("canvas");
    canvas.width = BORDER_RIGHT;
    canvas.height = BORDER_UP;
    canvas.style.border = "15px solid black"
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
    state.interval = setInterval(refresh_canvas(ctx), state.speed);
}

const refresh_canvas = (ctx) => () => {
    ctx.clearRect(0, 0, BORDER_RIGHT, BORDER_UP);
    if(is_not_died_snake(state.snake_state)){
        if(there_is_no_apple(state.apple_state.position)){
            state.apple_state = create_apple(position_randomizer())(state.snake_state.body);
        }
        draw_snake(state.snake_state.body, ctx);
        draw_apple(ctx, state.apple_state.position);
        state.snake_state = move_snake(state.snake_state);
        state.snake_state = check_border_collision(state.snake_state);
    }else {
        draw_snake(state.snake_state.body, ctx);
        clearInterval(state.interval);
    }
}

const there_is_no_apple = (position) => position === null;


const is_not_died_snake = (snake_state) => !snake_state.died;

export const init = () => {
    const ctx = canvas_setup();
    keyboard_setup(ctx);
}
