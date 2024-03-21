import {
    APPLE_IMG,
    SNAKE_HEAD_IMG_DOWN,
    SNAKE_HEAD_IMG_LEFT,
    SNAKE_HEAD_IMG_RIGHT,
    SNAKE_HEAD_IMG_UP, SPRITES_MAP
} from "./constants.js";


let sprites_images = {
    apple: new Image(),
    snake_head_UP: new Image(),
    snake_head_DOWN: new Image(),
    snake_head_RIGHT: new Image(),
    snake_head_LEFT: new Image(),

}

export const preload_sprites_images = () => {
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
}

const handle_response = blobs => {
    blobs.forEach(blob => {
        blob.data.then(data => {
            sprites_images[blob.index].src = URL.createObjectURL(data);
        })
    })
    return sprites_images
}

const fetch_image = (url) => {
    return fetch(url).then(response => ({
        data: response.blob(),
        index: get_image_index(url)
    }));
}

const get_image_index = url => SPRITES_MAP[url];
