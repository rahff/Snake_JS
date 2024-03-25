import {err, ok} from "../common/result.js";
import {competition} from "./model.js";



export const office_organization_service = (create_competition, date_provider) => {
    return async competition_data => {
        const creation_result = competition(competition_data, date_provider.now());
        if(creation_result.error) return err(creation_result.error);
        await create_competition(creation_result.data);
        return ok();
    }
}

