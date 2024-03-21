// src/core/common.js
var position_equal = (position, other) => {
  return position.x === other.x && position.y === other.y;
};

// src/constants.js
var RIGHT = "RIGHT";
var UP = "UP";
var DOWN = "DOWN";
var LEFT = "LEFT";
var opposite_directions = {
  [UP]: DOWN,
  [DOWN]: UP,
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
var BORDER_RIGHT_BLOCK = BORDER_RIGHT / BLOCK_SIZE + 1;
var BORDER_UP_BLOCK = BORDER_UP / BLOCK_SIZE + 1;
var APPLE_EATEN_EVENT = "apple_eaten";
var NEXT_LEVEL_REACHED_EVENT = "next_level_reached";
var SPRITES_MAP = {
  "/sprites/snake_head_UP.png": "snake_head_UP",
  "/sprites/snake_head_DOWN.png": "snake_head_DOWN",
  "/sprites/snake_head_RIGHT.png": "snake_head_RIGHT",
  "/sprites/snake_head_LEFT.png": "snake_head_LEFT",
  "/sprites/apple.png": "apple"
};
var APPLE_IMG = "/sprites/apple.png";
var SNAKE_HEAD_IMG_UP = "/sprites/snake_head_UP.png";
var SNAKE_HEAD_IMG_DOWN = "/sprites/snake_head_DOWN.png";
var SNAKE_HEAD_IMG_RIGHT = "/sprites/snake_head_RIGHT.png";
var SNAKE_HEAD_IMG_LEFT = "/sprites/snake_head_LEFT.png";
var SNAKE_COLOR = "#6a9e68";

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
var feed_snake = (snake_state) => {
  const snake_tail = { ...snake_state.body[snake_state.body.length - 1] };
  return {
    ...snake_state,
    body: [...snake_state.body, tail_position(snake_tail, snake_state.direction)]
  };
};
var tail_position = (tail, direction) => {
  switch (direction) {
    case RIGHT:
      return { ...tail, x: --tail.x };
    case UP:
      return { ...tail, y: --tail.y };
    case LEFT:
      return { ...tail, x: ++tail.x };
    case DOWN:
      return { ...tail, y: ++tail.y };
  }
};

// src/core/game_area.js
var check_border_collision = (snake_state) => {
  if (snake_state.died)
    return snake_state;
  const snake_head = { ...snake_state.body[0] };
  return {
    ...snake_state,
    died: killIfOnTheBorder(snake_head)
  };
};
var killIfOnTheBorder = (snake_head) => {
  return snake_head.x >= BORDER_RIGHT_BLOCK - 1 || snake_head.x < BORDER_LEFT || snake_head.y >= BORDER_UP_BLOCK - 1 || snake_head.y < BORDER_DOWN;
};

// src/app/position_randomizer.js
var position_randomizer = () => ({
  random_position: () => ({ x: random_x(), y: random_y() })
});
var random_x = () => Math.floor(Math.random() * (BORDER_RIGHT_BLOCK - 2)) + 1;
var random_y = () => Math.floor(Math.random() * (BORDER_UP_BLOCK - 2)) + 1;

// src/core/apple.js
var create_apple = (positionRandomizer) => (snake_body) => {
  const apple_position = positionRandomizer.random_position();
  if (snake_body.some((pos) => position_equal(pos, apple_position)))
    return create_apple(positionRandomizer)(snake_body);
  return {
    eaten_event: null,
    position: apple_position
  };
};
var is_bitten_by_snake = (apple_generator) => (apple_state, snake_body) => {
  const snake_head = { ...snake_body[0] };
  if (position_equal(apple_state.position, snake_head)) {
    return { ...apple_generator(snake_body), eaten_event: new Event(APPLE_EATEN_EVENT) };
  }
  return apple_state;
};

// src/app/drawing.js
var draw_game_sprites = (state, ctx) => {
  const snake_head_sprite = state.sprites["snake_head_" + state.snake_state.direction];
  const apple_sprite = state.sprites["apple"];
  draw_snake(state.snake_state.body, ctx, snake_head_sprite);
  draw_apple(ctx, state.apple_state.position, apple_sprite);
  draw_score(state.score, ctx);
};
var draw_apple = (ctx, position, sprite) => {
  ctx.drawImage(sprite, apple_bloc(position.x), apple_bloc(position.y));
  ctx.save();
};
var draw_snake = (snake, ctx, sprite) => {
  const [head, ...body] = snake;
  draw_snake_head(head, ctx, sprite);
  draw_snake_body(body, ctx);
  ctx.save();
};
var draw_snake_head = (head, ctx, sprite) => {
  ctx.drawImage(sprite, snake_bloc(head.x), snake_bloc(head.y));
};
var draw_snake_body = (body, ctx) => {
  ctx.fillStyle = SNAKE_COLOR;
  body.forEach((block) => {
    ctx.beginPath();
    ctx.roundRect(snake_bloc(block.x), snake_bloc(block.y), BLOCK_SIZE, BLOCK_SIZE, 5);
    ctx.fill();
  });
};
var draw_score = (score, ctx) => {
  ctx.fillStyle = "light-grey";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(score.toString(), 15, 15);
  ctx.save();
};
var snake_bloc = (x) => x * BLOCK_SIZE;
var apple_bloc = (x) => x * BLOCK_SIZE;

// src/app/snake_game.js
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
  apple_state: {
    position: position_randomizer().random_position(),
    eaten_event: null
  },
  speed: 120,
  interval: 0,
  score: 0,
  sprites: null
};
var apple_generator = create_apple(position_randomizer());
var canvas_setup = () => {
  const root_element = document.querySelector("#game");
  const canvas = document.createElement("canvas");
  canvas.width = BORDER_RIGHT;
  canvas.height = BORDER_UP;
  canvas.style.border = "15px solid black";
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
var game_events_setup = (ctx) => {
  window.addEventListener(APPLE_EATEN_EVENT, on_apple_eaten);
  window.addEventListener(NEXT_LEVEL_REACHED_EVENT, on_next_level(ctx));
};
var launch_game = (ctx) => {
  if (!state.interval)
    start_level(ctx);
};
var start_level = (ctx) => {
  state.interval = setInterval(refresh_canvas(ctx), state.speed);
};
var refresh_canvas = (ctx) => () => {
  ctx.clearRect(0, 0, BORDER_RIGHT, BORDER_UP);
  if (is_not_died_snake(state.snake_state)) {
    step_forward();
    draw_game_sprites(state, ctx);
  } else
    loose_game(ctx);
};
var loose_game = (ctx) => {
  clearInterval(state.interval);
  draw_game_sprites(state, ctx);
};
var step_forward = () => {
  state.snake_state = move_snake(state.snake_state);
  state.snake_state = check_border_collision(state.snake_state);
  state.apple_state = is_bitten_by_snake(apple_generator)(state.apple_state, state.snake_state.body);
  if_apple_eaten();
};
var is_not_died_snake = (snake_state) => !snake_state.died;
var if_apple_eaten = () => {
  if (state.apple_state.eaten_event)
    dispatchEvent(state.apple_state.eaten_event);
};
var on_apple_eaten = () => {
  state.snake_state = feed_snake(state.snake_state);
  state.apple_state.eaten_event = null;
  increment_score();
};
var increment_score = () => {
  state.score = ++state.score;
  if (next_level_reached(state.score))
    dispatchEvent(new Event(NEXT_LEVEL_REACHED_EVENT));
};
var next_level_reached = (score) => score % 5 === 0;
var on_next_level = (ctx) => () => {
  state.speed = state.speed - state.speed * 0.04;
  clearInterval(state.interval);
  start_level(ctx);
};
var init = (sprites) => {
  state.sprites = sprites;
  const ctx = canvas_setup();
  keyboard_setup(ctx);
  game_events_setup(ctx);
};

// src/preload.js
var sprites_images = {
  apple: new Image,
  snake_head_UP: new Image,
  snake_head_DOWN: new Image,
  snake_head_RIGHT: new Image,
  snake_head_LEFT: new Image
};
var preload_sprites_images = () => {
  const apple_sprite = fetch_image(APPLE_IMG);
  const snake_head_up_sprite = fetch_image(SNAKE_HEAD_IMG_UP);
  const snake_head_down_sprite = fetch_image(SNAKE_HEAD_IMG_DOWN);
  const snake_head_right_sprite = fetch_image(SNAKE_HEAD_IMG_RIGHT);
  const snake_head_left_sprite = fetch_image(SNAKE_HEAD_IMG_LEFT);
  return Promise.all([
    apple_sprite,
    snake_head_left_sprite,
    snake_head_down_sprite,
    snake_head_right_sprite,
    snake_head_up_sprite
  ]).then(handle_response);
};
var handle_response = (blobs) => {
  blobs.forEach((blob) => {
    blob.data.then((data) => {
      sprites_images[blob.index].src = URL.createObjectURL(data);
    });
  });
  return sprites_images;
};
var fetch_image = (url) => {
  return fetch(url).then((response) => ({
    data: response.blob(),
    index: get_image_index(url)
  }));
};
var get_image_index = (url) => SPRITES_MAP[url];

// src/index.js
var main = function() {
  preload_sprites_images().then((sprites_images2) => init(sprites_images2));
};
main();
