import {Router} from "express";
import {score_registration_controller, snapshot_controller} from "../../controller/score/score_controllers.js";
import {score_module} from "../../dependency_injection/score_module.js";

export const score_router = Router();

score_router.post(
    "register",
    score_registration_controller(
        score_module.registration_service,
        score_module.validation_service
    )
)

score_router.post(
    "snapshot",
    snapshot_controller(score_module.snapshot_recording_service)
)