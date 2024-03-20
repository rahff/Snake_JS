import {image_builder} from "./core/common.js";

export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";
export const LEFT = "LEFT";

export const opposite_directions = {
    [UP]: DOWN,
    [DOWN]: UP,
    [LEFT]: RIGHT,
    [RIGHT]: LEFT
}

export const snake_initial_state = {direction: RIGHT, body: [{x: 30, y: 30}, {x: 29, y: 30}, {x: 28, y: 30}, {x: 27, y: 30}], died: false};

export const apple_initial_state = {position: null};

export const game_state = {
    snake_state: {...snake_initial_state},
    apple_state: {...apple_initial_state}
}

export const BORDER_UP = 600;
export const BORDER_DOWN = 0;
export const BORDER_RIGHT = 900;
export const BORDER_LEFT = 0;

export const ARROW_RIGHT_KEY = "ArrowRight";
export const ARROW_LEFT_KEY = "ArrowLeft";
export const ARROW_UP_KEY = "ArrowUp";
export const ARROW_DOWN_KEY = "ArrowDown";
export const ENTER_KEY = "Enter";
export const ESCAPE_KEY = "Escape";

export const BLOCK_SIZE = 30;
export const BORDER_RIGHT_BLOCK = BORDER_RIGHT/BLOCK_SIZE +1
export const BORDER_UP_BLOCK = BORDER_UP/BLOCK_SIZE+1

export const APPLE_EATEN_EVENT = "apple_eaten";
export const NEXT_LEVEL_REACHED_EVENT = "next_level_reached";
export const APPLE_IMG = "../sprites/apple.png"
export const SNAKE_HEAD_IMG = "../sprites/snake_head_"
export const SNAKE_COLOR = "#6a9e68";

