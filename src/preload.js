import {
    APPLE_IMG,
    SNAKE_HEAD_IMG_DOWN,
    SNAKE_HEAD_IMG_LEFT,
    SNAKE_HEAD_IMG_RIGHT,
    SNAKE_HEAD_IMG_UP, SPRITES_MAP
} from "./constants.js";



export const preload_sprites_images = () => {
    return Promise.all([
        fetch_image(APPLE_IMG),
        fetch_image(SNAKE_HEAD_IMG_UP),
        fetch_image(SNAKE_HEAD_IMG_DOWN),
        fetch_image(SNAKE_HEAD_IMG_RIGHT),
        fetch_image(SNAKE_HEAD_IMG_LEFT)
    ]).then(handle_response);
}

const fetch_image = (url) => {
    return fetch(url).then(response => ({
        data: response.blob(),
        index: get_image_index(url)
    }));
}

const get_image_index = url => SPRITES_MAP[url];

const handle_response = async (blobs) => {
    const sprites_images = {
        apple: new Image(),
        snake_head_UP: new Image(),
        snake_head_DOWN: new Image(),
        snake_head_RIGHT: new Image(),
        snake_head_LEFT: new Image(),
    }
    const data_images = blobs.map(async (blob) => {
        const data = await blob.data;
        return {data, index: blob.index}
    });
    const images = await Promise.all(data_images);
    images.forEach(img => sprites_images[img.index].src = URL.createObjectURL(img.data));
    return sprites_images;
}


