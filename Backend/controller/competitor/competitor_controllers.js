import {competition_eventBus, COMPETITOR_PARTICIPATED} from "../../application/competition/competition_events.js";
import {command, internal_server_exception, ok_status} from "../common/common.js";
import {doing, err, ok} from "../../application/common/common.js";



export const participation_controller = (participation_service) => {
    return async (req, res) => {
        const participation_id = req.params["competition_id"];
        const competitor = req["authentication"];
        return command(participation_service, competitor, participation_id)
            .then(_ => _.is_ok_do(redirect_to_checkout(res)))
            .catch(internal_server_exception(res));
    }
}

const redirect_to_checkout = res => result => {
    res.redirect(result.data.checkout_url);
}

export const payment_events_controller = (participation_registration) => {
    return async (req, res) => {
        return doing(get_payment_confirmation, req.body)
            .is_ok_do(register_participation(participation_registration))
            .then(_ => _.or_else_do(ok_status(res)))
            .then(participation_registered)
            .catch(internal_server_exception(res))
    }
}

const participation_registered = result => {
    competition_eventBus.emit(COMPETITOR_PARTICIPATED, {
        competitor_id: result.data.competitor_id,
        competition_id: result.data.competition_id
    });
}

const register_participation = (service, res) => async payment => {
    const result = await service(payment.data);
    res.status.end();
    return result;
}

const get_payment_confirmation = (stripe_event) => {
    if(stripe_event.type === "non_relevant") return err();
    return ok({checkout_session_id: "checkout_session_id", status: "CONFIRMED"});
}