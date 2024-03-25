import {ok} from "../common/result.js";
import {one_euro_prize} from "./model.js";



export const office_prize_registration_service = save_prize => {
    return async competition_created_event => {
        const {competition_id} = competition_created_event;
        await save_prize(one_euro_prize(competition_id));
        return ok();
    }
}