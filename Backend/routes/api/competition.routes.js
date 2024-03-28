import {Router} from "express";
import {competition_module} from "../../dependency_injection/competition_module.js";
import {organize_competition_controller} from "../../controller/competition/competition_controller.js";



export const competition_router = Router();


competition_router.post(
    "organize",
    organize_competition_controller(
        competition_module.organization_service)
)