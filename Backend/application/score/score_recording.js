import {ok} from "../common/common.js";



export const score_recording = save_score => {
    return async score => {
        await save_score(score);
        return ok();
    }
}


export const state_snapshot_recording = save_snapshot => {
    return async snapshot => {
        await save_snapshot(snapshot);
        return ok();
    }
}