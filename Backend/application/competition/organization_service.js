import {competition} from "./model/Competition.js";
import {create, err, ok} from "../common/common.js";



export const organize_competition = (save_competition, date_provider) => {
    return async competition_data => {
        return create(competition, competition_data, date_provider.now())
        .is_ok_do(create_competition(save_competition))
        .then(_ => _.or_else_do(_ => err(_.error)))
        .catch(error => err(error));
    }
}

const create_competition = save => async (result) => {
    await save(result.data);
    return ok({id: result.data.id});
}

