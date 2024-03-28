import {ok} from "../common/common.js";



export const game_register_service = save_game => {
    return async game => {
        await save_game(game);
        return ok();
    }
}