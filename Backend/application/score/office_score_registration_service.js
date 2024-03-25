import {err, ok} from "../common/result.js";



export const office_score_registration_service = save_score => {
    return async score => {
        await save_score(score);
        return ok();
    }
}


export const state_snapshot_recorder = save_snapshot => {
    return async snapshot => {
        await save_snapshot(snapshot);
        return ok();
    }
}