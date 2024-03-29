import {save_on_in_memory} from "../common/common.js";


export const in_memory_save_participation = db => async participation => {
    save_on_in_memory(db, participation, "id");
}

export const in_memory_get_participation = db => async id => {
    return db.find(participation => participation.id === id);
}