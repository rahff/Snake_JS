import {authentication_service} from "../application/competitor/authentication_service.js";
import {
    in_memory_email_checker,
    in_memory_get_competitor,
    in_memory_save_competitor
} from "../data_access/competitor/competitor_data_access.js";
import {fake_password_matcher} from "../services/security/password_service.js";
import {fake_jwt_token_builder} from "../services/security/jwt_service.js";
import {competitor_db} from "../data_access/competitor/in_memory_data.js";
import {registration_service} from "../application/competitor/registration_service.js";



export const authentication_module = {
    authentication: authentication_service(
        in_memory_get_competitor(competitor_db.competitors),
        fake_password_matcher, fake_jwt_token_builder),
    registration : registration_service(
        in_memory_save_competitor(competitor_db.competitors),
        in_memory_email_checker(competitor_db.competitors))
}

