import {BLOCK_SIZE} from "../constants.js";


export const position_equal = (position, other) => {
    return position.x === other.x && position.y === other.y
}


export const image_builder = (src) => {
    const img = new Image()
    img.src = src;
    img.width = 10;
    img.height = 10;
    return img;
}

