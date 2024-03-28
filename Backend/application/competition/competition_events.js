import {EventEmitter} from "node:events"
import {prize_module} from "../../dependency_injection/prize_module.js";


export const COMPETITOR_PARTICIPATED = "COMPETITOR_PARTICIPATED";
export const COMPETITION_CREATED = "COMPETITION_CREATED";

export const competition_eventBus = new EventEmitter()
            .on(COMPETITION_CREATED, prize_module.create)
            .on(COMPETITOR_PARTICIPATED, prize_module.increment_prize);


