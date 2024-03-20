// src/constants.js
var RIGHT = "RIGHT";
var UP = "UP";
var DOWN = "DOWN";
var LEFT = "LEFT";
var opposite_directions = {
  [UP]: DOWN,
  [LEFT]: RIGHT,
  [RIGHT]: LEFT
};
var snake_initial_state = { direction: RIGHT, body: [{ x: 30, y: 30 }, { x: 29, y: 30 }, { x: 28, y: 30 }, { x: 27, y: 30 }], died: false };
var apple_initial_state = { position: null };
var game_state = {
  snake_state: { ...snake_initial_state },
  apple_state: { ...apple_initial_state }
};
var BORDER_UP = 600;
var BORDER_DOWN = 0;
var BORDER_RIGHT = 900;
var BORDER_LEFT = 0;
var ARROW_RIGHT_KEY = "ArrowRight";
var ARROW_LEFT_KEY = "ArrowLeft";
var ARROW_UP_KEY = "ArrowUp";
var ARROW_DOWN_KEY = "ArrowDown";
var ENTER_KEY = "Enter";
var BLOCK_SIZE = 30;
var BORDER_RIGHT_BLOCK = BORDER_RIGHT / BLOCK_SIZE;
var BORDER_UP_BLOCK = BORDER_UP / BLOCK_SIZE;

// src/core/common.js
var position_equal = (position, other) => {
  return position.x === other.x && position.y === other.y;
};

// src/core/snake.js
var move_snake = (snake_state) => {
  const head = get_head_position(snake_state.direction, { ...snake_state.body[0] });
  const body = snake_state.body.slice(0, -1);
  return {
    ...snake_state,
    body: [head, ...body],
    died: body.some((pos) => position_equal(pos, head))
  };
};
var get_head_position = (direction, position) => {
  switch (direction) {
    case RIGHT:
      return { ...position, x: ++position.x };
    case UP:
      return { ...position, y: --position.y };
    case LEFT:
      return { ...position, x: --position.x };
    case DOWN:
      return { ...position, y: ++position.y };
  }
};
var turn_snake = (snake_state, new_direction) => {
  return {
    ...snake_state,
    direction: change_direction(snake_state.direction, new_direction)
  };
};
var change_direction = (old_direction, new_direction) => {
  if (opposite_directions[old_direction] === new_direction) {
    return old_direction;
  }
  return new_direction;
};

// src/core/game_area.js
var check_border_collision = (snake_state) => {
  const snake_head = { ...snake_state.body[0] };
  return {
    ...snake_state,
    died: killIfOnTheBorder(snake_head)
  };
};
var killIfOnTheBorder = (snake_head) => {
  return snake_head.x >= BORDER_RIGHT_BLOCK - 1 || snake_head.x <= BORDER_LEFT || snake_head.y >= BORDER_UP_BLOCK - 1 || snake_head.y <= BORDER_DOWN;
};

// src/app/snake_game.js
var snake_bloc = (x) => x * BLOCK_SIZE;
var state = {
  snake_state: {
    direction: RIGHT,
    body: [
      { x: 15, y: 15 },
      { x: 14, y: 15 },
      { x: 13, y: 15 },
      { x: 12, y: 15 }
    ],
    died: false
  },
  apple_state: { position: null }
};
var canvas_setup = () => {
  const root_element = document.querySelector("#game");
  const canvas = document.createElement("canvas");
  canvas.width = BORDER_RIGHT;
  canvas.height = BORDER_UP;
  canvas.style.border = "3px solid black";
  root_element.appendChild(canvas);
  return canvas.getContext("2d");
};
var keyboard_setup = (ctx) => {
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
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
      default:
        return;
    }
  });
};
var launch_game = (ctx) => {
  requestAnimationFrame(refresh_canvas(ctx));
};
var refresh_canvas = (ctx) => () => {
  ctx.clearRect(0, 0, BORDER_RIGHT, BORDER_UP);
  if (is_not_died_snake(state.snake_state)) {
    draw_snake(state.snake_state.body, ctx);
    ctx.save();
    state.snake_state = move_snake(state.snake_state);
    state.snake_state = check_border_collision(state.snake_state);
    requestAnimationFrame(refresh_canvas(ctx));
  } else
    draw_snake(state.snake_state.body, ctx);
};
var draw_snake = (snake2, ctx) => {
  const [head, ...body] = snake2;
  draw_snake_head(head, ctx);
  draw_snake_body(body, ctx);
};
var draw_snake_head = (head, ctx) => {
  ctx.fillStyle = "red";
  ctx.fillRect(snake_bloc(head.x), snake_bloc(head.y), BLOCK_SIZE, BLOCK_SIZE);
};
var draw_snake_body = (body, ctx) => {
  ctx.fillStyle = "black";
  body.forEach((block) => ctx.fillRect(snake_bloc(block.x), snake_bloc(block.y), BLOCK_SIZE, BLOCK_SIZE));
};
var is_not_died_snake = (snake_state) => !snake_state.died;
var init = () => {
  const ctx = canvas_setup();
  keyboard_setup(ctx);
};

// src/index.js
var main = function() {
  init();
};
main();
