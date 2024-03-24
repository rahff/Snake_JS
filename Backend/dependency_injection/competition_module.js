import {fake_checkout_session} from "../services/checkout/checkout.js";
import {
    in_memory_get_participation,
    in_memory_save_participation
} from "../data_access/competition/participation_data_access.js";
import {
    office_participation_checkout_service,
    office_participation_register_service
} from "../application/competition/office_participation_service.js";

export const office_participation_module = () => {
    const deps = {
        create_checkout: process.env.TESTING ? fake_checkout_session : null,
        save_participation: process.env.TESTING ? in_memory_save_participation : null
    };
    return office_participation_checkout_service(
        deps.create_checkout,
        deps.save_participation
    );
}

export const office_participation_register_module = () => {
    const deps = {
        save_participation: process.env.TESTING ? in_memory_save_participation : null,
        get_participation:  process.env.TESTING ? in_memory_get_participation : null
    }

    return office_participation_register_service(
        deps.save_participation,
        deps.get_participation
    );
}