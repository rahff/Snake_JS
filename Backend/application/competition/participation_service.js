import {doing, err, ok, query} from "../common/common.js";
import {paid_participation, unpaid_participation} from "./model.js";



export const create_participation_checkout = (create_participation_checkout, save_participation) => {
    return async (competitor, competition_id) => {
        return query(create_participation_checkout, competition_id)
            .then(_ => _.if_present(create_participation(save_participation, competitor)))
            .then(_ => _.unwrap())
            .catch(error => err(error));
    }
}

const create_participation = (save_participation, competitor) => async checkout_session => {
    await save_participation(unpaid_participation(competitor, checkout_session));
    return ok({checkout_url: checkout_session.payment_url});
}

export const formalize_participation = (save_participation, get_participation) => {
    return async payment_confirmation => {
            return doing(check_payment, payment_confirmation)
                .is_ok_do(apply_participation_payment(get_participation, save_participation))
                .then(_ => _.unwrap())
                .catch(error => err(error));
    }
}

const apply_participation_payment = (get_participation, save_participation) => async result => {
    const {checkout_session_id, competition_id} = result.data;
    return query(get_participation, checkout_session_id)
        .then(_ => _.if_present(mark_as_paid(save_participation, competition_id)))
        .then(_ => _.or_else_do(error_not_found(result.data)))
        .catch(error => err(error));
}

const mark_as_paid = (save_participation, competition_id) => async (unpaid_participation) => {
    const participation = paid_participation(unpaid_participation);
    await save_participation(participation);
    return ok({competitor_id: participation.competitor.id, competition_id});
}

const error_not_found = ref => () => err({message: "participation not found", ref});

const check_payment = (payment_confirmation) => {
    if(payment_confirmation.status === "REJECTED")
        return err({message: "payment rejected", ref: payment_confirmation});
    return ok(payment_confirmation);
}
