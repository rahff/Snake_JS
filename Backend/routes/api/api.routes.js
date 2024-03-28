import {Router} from "express";
import {authentication_router} from "./authentication.routes.js";
import {competitor_router} from "./competitor.routes.js";
import {competition_router} from "./competition.routes.js";
import {score_router} from "./score.routes.js";

export const api_router = Router();

api_router.use("/auth", authentication_router);
api_router.use("/competitors", competitor_router);
api_router.use("/competitions", competition_router);
api_router.use("/scores", score_router);