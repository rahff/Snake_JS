import {BLOCK_SIZE} from "../constants.js";



export const draw_game_sprites = (state, ctx) => {
    draw_snake(state.snake_state.body, ctx);
    draw_apple(ctx, state.apple_state.position);
    draw_score(state.score, ctx);
}


export const draw_apple = (ctx, position) => {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(apple_bloc(position.x), apple_bloc(position.y), BLOCK_SIZE/2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.save();
}

export const draw_snake = (snake, ctx) => {
    const [head, ...body] = snake;
    draw_snake_head(head, ctx);
    draw_snake_body(body, ctx);
    ctx.save();
}

const draw_snake_head = (head, ctx) => {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.roundRect(snake_bloc(head.x), snake_bloc(head.y), BLOCK_SIZE, BLOCK_SIZE, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

const draw_snake_body = (body, ctx) => {
    ctx.fillStyle = "black";
    body.forEach(block => ctx.fillRect(snake_bloc(block.x), snake_bloc(block.y), BLOCK_SIZE, BLOCK_SIZE));
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
const apple_bloc = (x) => x * BLOCK_SIZE + (BLOCK_SIZE/2);
