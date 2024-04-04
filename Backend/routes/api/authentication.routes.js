import {authentication_module} from "../../dependency_injection/authentication_module.js";
import {Router} from "express";
import {register_competitor_controller} from "../../controller/authentication/register_controller.js";
import {log_in_controller} from "../../controller/authentication/log_in_controller.js"


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