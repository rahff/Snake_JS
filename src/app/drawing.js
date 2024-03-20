import {APPLE_IMG, BLOCK_SIZE, SNAKE_BLOCK_IMG, SNAKE_COLOR, SNAKE_HEAD_IMG} from "../constants.js";
import {image_builder} from "../core/common.js";



export const draw_game_sprites = (state, ctx) => {
    draw_snake(state.snake_state.body, ctx, state.snake_state.direction);
    draw_apple(ctx, state.apple_state.position);
    draw_score(state.score, ctx);
}


export const draw_apple = (ctx, position) => {
    ctx.drawImage(apple_image(), apple_bloc(position.x), apple_bloc(position.y));
    ctx.save();
}

const apple_image = () => image_builder(APPLE_IMG)

export const draw_snake = (snake, ctx, direction) => {
    const [head, ...body] = snake;
    draw_snake_head(head, ctx, direction);
    draw_snake_body(body, ctx);
    ctx.save();
}

const draw_snake_head = (head, ctx, direction) => {
    ctx.drawImage(snake_head_image(direction), snake_bloc(head.x), snake_bloc(head.y));
}

const snake_head_image = (direction) => {
    const src = SNAKE_HEAD_IMG+direction+".png";
    return image_builder(src);
}

const draw_snake_body = (body, ctx) => {
    ctx.fillStyle = SNAKE_COLOR;
    body.forEach(block => {
        ctx.beginPath()
        ctx.roundRect(snake_bloc(block.x), snake_bloc(block.y), BLOCK_SIZE, BLOCK_SIZE, 5);
        ctx.fill()
    });
}

export const draw_score = (score, ctx) => {
    ctx.fillStyle = "light-grey";
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(score.toString(), 15, 15);
    ctx.save();
}

const snake_bloc = (x) => x * BLOCK_SIZE;
const apple_bloc = (x) => x * BLOCK_SIZE;
