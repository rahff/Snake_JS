import {Router} from "express";
import {participation_checkout_controller} from "../../controller/competitor/participation_checkout_controller.js";
import {participation_module} from "../../dependency_injection/participation_module.js";
import {payment_webhook_controller} from "../../controller/competitor/payment_webhook_controller.js";


export const competitor_router = Router();


competitor_router.post(
    "/participate/confirm-payment",
    payment_webhook_controller(participation_module.registration_service)
);


competitor_router.post(
    "/participate/:competition_id",
    participation_checkout_controller(participation_module.checkout_service)
);

