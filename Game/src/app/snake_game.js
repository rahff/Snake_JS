import {
    APPLE_EATEN_EVENT,
    ARROW_DOWN_KEY,
    ARROW_LEFT_KEY,
    ARROW_RIGHT_KEY,
    ARROW_UP_KEY,
    BORDER_RIGHT,
    BORDER_UP, DOWN, ENTER_KEY,
    LEFT, NEXT_LEVEL_REACHED_EVENT,
    RIGHT,
    UP
} from "../constants.js";
import {feed_snake, move_snake, turn_snake} from "../core/snake.js";
import {check_border_collision} from "../core/game_area.js";
import {position_randomizer} from "./position_randomizer.js";
import {create_apple, is_bitten_by_snake} from "../core/apple.js";
import {draw_game_sprites} from "./drawing.js";


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
    apple_state: {
        position: position_randomizer().random_position(),
        eaten_event: null
    },
    speed: 120,
    interval: 0,
    score: 0,
    sprites: null
}

const apple_generator = create_apple(position_randomizer());

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
     addEventListener("keydown", (event) => {
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

const game_events_setup = (ctx) => {
    addEventListener(APPLE_EATEN_EVENT, on_apple_eaten);
    addEventListener(NEXT_LEVEL_REACHED_EVENT, on_next_level(ctx));
}

const launch_game = (ctx) => {
    if(!state.interval) start_level(ctx);
}

const start_level = (ctx) => {
    state.interval = setInterval(refresh_canvas(ctx), state.speed);
}

const refresh_canvas = (ctx) => () => {
    ctx.clearRect(0, 0, BORDER_RIGHT, BORDER_UP);
    if(is_not_died_snake(state.snake_state)){
        step_forward();
        draw_game_sprites(state, ctx);
    }else loose_game(ctx);
}

const loose_game = (ctx) => {
    clearInterval(state.interval);
    draw_game_sprites(state, ctx);
}

const step_forward = () => {
    state.snake_state = move_snake(state.snake_state);
    state.snake_state = check_border_collision(state.snake_state);
    state.apple_state = is_bitten_by_snake(apple_generator)(state.apple_state, state.snake_state.body);
    if_apple_eaten();
}

const is_not_died_snake = (snake_state) => !snake_state.died;

const if_apple_eaten = () => {
    if(state.apple_state.eaten_event){
        dispatchEvent(state.apple_state.eaten_event);
    }
}

const on_apple_eaten = () => {
    state.snake_state = feed_snake(state.snake_state);
    increment_score(state.apple_state.eaten_event.detail);
    state.apple_state.eaten_event = null;
}

const increment_score = (position_snapshot) => {
    state.score = ++state.score;
    if(next_level_reached(state.score))
        dispatchEvent(new CustomEvent(NEXT_LEVEL_REACHED_EVENT, {detail: {...position_snapshot}}));
}

const next_level_reached = (score) => score % 5 === 0;

const on_next_level = ctx => (event) => {
    state.speed = state.speed - (state.speed * 0.04);
    clearInterval(state.interval);
    create_snapshot({...state}, event.detail);
    start_level(ctx);
}

export const init = (sprites) => {
    state.sprites = sprites;
    const ctx = canvas_setup();
    keyboard_setup(ctx);
    game_events_setup(ctx);
}


const create_snapshot = (state, position_snapshot) => {
    const snapshot = {
        apple_position: position_snapshot.apple_position,
        snake_head: position_snapshot.snake_head,
        speed: state.speed,
        score: state.score,
        code: generate_code(state.interval, state.speed, state.score),
        competition_id: window.location.pathname.split('/')[1]
    }
    fetch("/snapshot", {
        body: snapshot,
        method: "POST",
        headers: {
            "Authorization": "jwt_token"
        }
    }).then()
}

const generate_code = (i, sp, sc) => (sp * i) - sc