import {competition_db} from "../data_access/competition/in_memory_data.js";
import {organize_competition} from "../application/competition/organization_service.js";
import {in_memory_save_competition} from "../data_access/competition/organization_data_access.js";
import {date_provider} from "../services/date_time.js";



export const competition_module = {
    organization_service: organize_competition(
        in_memory_save_competition(competition_db.competitions),
        date_provider)
}
