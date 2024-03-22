import {office_authentication_service} from "../application/competitor/office_authentication_service.js";
import {in_memory_get_competitor} from "../data_access/competitor/competitor_data_access.js";
import {fake_password_matcher} from "../security/password_service.js";
import {fake_jwt_token_builder} from "../security/jwt_service.js";
import {
    office_participation_register_service,
    office_participation_service
} from "../application/competitor/office_participation_service.js";
import {fake_checkout_session} from "../checkout/checkout.js";
import {
    in_memory_get_participation,
    in_memory_save_participation
} from "../data_access/competitor/participation-data-access.js";

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

export const office_participation_module = () => {
    const deps = {
        create_checkout: process.env.TESTING ? fake_checkout_session : null,
        save_participation: process.env.TESTING ? in_memory_save_participation : null
    };
    return office_participation_service(
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