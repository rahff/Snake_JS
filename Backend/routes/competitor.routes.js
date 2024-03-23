import {Router} from "express";
import {office_authentication_module,} from "../dependency_injection/competitor_module.js";
import {log_in_controller,
        participation_controller,
        payment_events_controller} from "../controller/competitor/competitor.controllers.js";
import {office_participation_module,
        office_participation_register_module} from "../dependency_injection/competition_module.js";


export const competitor_router = Router();

competitor_router.post(
    "/log_in",
    log_in_controller(office_authentication_module())
);

competitor_router.post(
    "/participate/:participation_id",
    participation_controller(office_participation_module())
);

competitor_router.post(
    "/participate/confirm-payment",
    payment_events_controller(office_participation_register_module())
);
