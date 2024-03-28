import {competition} from "./model.js";
import {doing, err, ok} from "../common/common.js";



export const organize_competition = (save_competition, date_provider) => {
    return async competition_data => {
        return doing(competition, competition_data, date_provider.now())
        .is_ok_do(create_competition(save_competition))
        .then(result => result.or_else_do(result => err(result.error)))
        .catch(error => err(error));
    }
}

const create_competition = save => async (result) => {
    await save(result.data);
    return ok({id: result.data.id});
}

