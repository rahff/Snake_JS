import {save_on_in_memory} from "../common/common.js";


export const in_memory_save_prize = db => async prize => {
    save_on_in_memory(db, prize, "competition_id");
}

export const in_memory_get_prize = db => competition_id => {
   return db.find(prize => prize.competition_id === competition_id);
}