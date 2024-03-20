import {BORDER_RIGHT, BORDER_RIGHT_BLOCK, BORDER_UP_BLOCK} from "../constants.js";

export const position_randomizer = () => ({
    random_position: () => ({x: random_x(), y: random_y()})
});

const random_x = () => Math.floor(Math.random() * BORDER_RIGHT_BLOCK) + 1;
const random_y = () => Math.floor(Math.random() * BORDER_UP_BLOCK) + 1;
