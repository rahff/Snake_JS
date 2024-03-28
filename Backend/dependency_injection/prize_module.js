import {competition_db} from "../data_access/competition/in_memory_data.js";
import {create_competition_prize, increment_competition_prize} from "../application/competition/prize_registration_service.js";
import {in_memory_get_prize, in_memory_save_prize} from "../data_access/competition/prize_data_access.js";


export const prize_module = {
    increment_prize: increment_competition_prize(
        in_memory_save_prize(competition_db.prizes),
        in_memory_get_prize(competition_db.prizes)),
    create: create_competition_prize(
        in_memory_save_prize(competition_db.prizes)
    )
}
