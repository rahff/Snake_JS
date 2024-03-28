import {game_register_service} from "../application/game/game_service.js";
import {game_db} from "../data_access/game/in_memory_data.js";
import {in_memory_save_game} from "../data_access/game/game_data_access.js";

export const game_module =  {
    register: game_register_service(in_memory_save_game(game_db.games))
}