import {err, ok, query} from "../common/common.js";
import {increment_prize, one_euro_prize} from "./model/Prize.js";



export const create_competition_prize = save_prize => {
    return async competition_created_event => {
        const {id} = competition_created_event;
        await save_prize(one_euro_prize(id));
        return ok();
    }
}

export const increment_competition_prize = (save_prize, get_prize) => {
    return async competitor_participated_event  => {
        const {competition_id} = competitor_participated_event;
        return await query(get_prize, competition_id)
        .then(_ => _.if_present(apply_prize_incrementation(save_prize)))
        .then(_=> _.or_else_do(error_not_found));
    }
}

const apply_prize_incrementation = save_prize => async prize => {
    await save_prize(increment_prize(prize));
    return ok();
}

const error_not_found = () => err({message: "prize not found"});