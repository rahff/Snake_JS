import {ok} from "../common/result.js";



export const office_score_registration_service = (save_score) => {
    return async (score) => {
        await save_score(score);
        return ok();
    }
}