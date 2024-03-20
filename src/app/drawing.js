import {BLOCK_SIZE} from "../constants.js";





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
    ctx.fillRect(snake_bloc(head.x), snake_bloc(head.y), BLOCK_SIZE, BLOCK_SIZE);
}

const draw_snake_body = (body, ctx) => {
    ctx.fillStyle = "black";
    body.forEach(block => ctx.fillRect(snake_bloc(block.x), snake_bloc(block.y), BLOCK_SIZE, BLOCK_SIZE));
}

const snake_bloc = (x) => x * BLOCK_SIZE;
const apple_bloc = (x) => x * BLOCK_SIZE + (BLOCK_SIZE/2);
