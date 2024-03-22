import {BLOCK_SIZE, SNAKE_COLOR} from "../constants.js";




export const draw_game_sprites = (state, ctx) => {
    const snake_head_sprite = state.sprites["snake_head_"+state.snake_state.direction];
    const apple_sprite = state.sprites["apple"];
    draw_snake(state.snake_state.body, ctx, snake_head_sprite);
    draw_apple(ctx, state.apple_state.position, apple_sprite);
    draw_score(state.score, ctx);
}

export const draw_apple = (ctx, position, sprite) => {
    ctx.drawImage(sprite, apple_bloc(position.x), apple_bloc(position.y));
    ctx.save();
}

export const draw_snake = (snake, ctx, sprite) => {
    const [head, ...body] = snake;
    draw_snake_head(head, ctx, sprite);
    draw_snake_body(body, ctx);
    ctx.save();
}

const draw_snake_head = (head, ctx, sprite) => {
    ctx.drawImage(sprite, snake_bloc(head.x), snake_bloc(head.y));
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
    ctx.fillStyle = SNAKE_COLOR;
    ctx.font = '28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(score.toString(), 15, 15);
    ctx.save();
}

const snake_bloc = (x) => x * BLOCK_SIZE;
const apple_bloc = (x) => x * BLOCK_SIZE;
