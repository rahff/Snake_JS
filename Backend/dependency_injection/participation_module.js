import {
    create_participation_checkout,
    formalize_participation
} from "../application/competition/participation_service.js";
import {fake_checkout_session} from "../services/checkout/checkout.js";
import {
    in_memory_get_participation,
    in_memory_save_participation
} from "../data_access/competition/participation_data_access.js";
import {competition_db} from "../data_access/competition/in_memory_data.js";



export const participation_module = {
    checkout_service: create_participation_checkout(
        fake_checkout_session,
        in_memory_save_participation(competition_db.participations)),
    registration_service: formalize_participation(
        in_memory_save_participation(competition_db.competitions),
        in_memory_get_participation(competition_db.competitions)
    )
}
