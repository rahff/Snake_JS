import {doing, err, ok} from "../../application/common/common.js";
import {internal_server_exception, ok_status} from "../common/common.js";
import {competition_eventBus, COMPETITOR_PARTICIPATED} from "../../application/competition/competition_events.js";


export const STRIPE_CHECKOUT_SUCCEED = "checkout.success";

export const payment_webhook_controller = (participation_registration) => {
    return async (req, res) => {
        return doing(get_payment_confirmation, req.body)
            .is_ok_do(register_participation(participation_registration, res))
            .then(_ => _.or_else_do(ok_status(res)))
            .then(participation_registered)
            .catch(internal_server_exception(res))
    }
}

const participation_registered = result => {
    competition_eventBus.emit(COMPETITOR_PARTICIPATED, result.data);
}

const register_participation = (service, res) => async payment => {
    const result = await service(payment.data);
    res.status(200).end();
    return result;
}

const get_payment_confirmation = (stripe_event) => {
    if(stripe_event.type !== STRIPE_CHECKOUT_SUCCEED) return err();
    return ok({
        checkout_session_id: "checkout_session_id",
        status: "CONFIRMED",
        competition_id: "competition_id"
    });
}