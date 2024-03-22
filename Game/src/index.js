import {init} from "./app/snake_game.js";
import {preload_sprites_images} from "./preload.js"


function main() {
    preload_sprites_images().then(sprites_images => init(sprites_images));
}

main();