import {ok} from "../common/result.js";

export const office_game_availability_service = (save_game) => {
    return async (game) => {
        await save_game(game);
        return ok();
    }
}