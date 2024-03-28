import {authentication_module} from "../../dependency_injection/authentication_module.js";
import {Router} from "express";
import {
    log_in_controller,
    register_competitor_controller
} from "../../controller/authentication/authentication_controllers.js";



export const authentication_router = Router();

authentication_router.post(
    "/log_in",
    log_in_controller(authentication_module.authentication)
);

authentication_router.post(
    "/register",
    register_competitor_controller(
        authentication_module.registration,
        authentication_module.authentication
    )
);