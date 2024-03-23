import {office_authentication_service} from "../application/competitor/office_authentication_service.js";
import {in_memory_get_competitor} from "../data_access/competitor/competitor_data_access.js";
import {fake_password_matcher} from "../services/security/password_service.js";
import {fake_jwt_token_builder} from "../services/security/jwt_service.js";
import {
    office_participation_register_service,
    office_participation_checkout_service
} from "../application/competition/office_participation_service.js";
import {fake_checkout_session} from "../services/checkout/checkout.js";
import {
    in_memory_get_participation,
    in_memory_save_participation
} from "../data_access/competition/participation-data-access.js";

export const office_authentication_module = () => {
    const deps = {
        get_competitor: process.env.TESTING ? in_memory_get_competitor : null,
        password_matcher: process.env.TESTING ? fake_password_matcher : null,
        jwt_token_builder: process.env.TESTING ? fake_jwt_token_builder : null,
    }
    return office_authentication_service(
        deps.get_competitor,
        deps.password_matcher,
        deps.jwt_token_builder
    );
}

