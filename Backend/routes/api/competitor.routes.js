import {Router} from "express";
import {participation_controller, payment_events_controller} from "../../controller/competitor/competitor_controllers.js";
import {participation_module} from "../../dependency_injection/participation_module.js";


export const competitor_router = Router();


competitor_router.post(
    "/participate/confirm-payment",
    payment_events_controller(participation_module.registration_service)
);


competitor_router.post(
    "/participate/:competition_id",
    participation_controller(participation_module.checkout_service)
);

