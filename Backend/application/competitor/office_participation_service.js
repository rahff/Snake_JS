import {err, ok} from "../common/result.js";
import {paid_participation, unpaid_participation} from "./model.js";



export const office_participation_service = (create_participation_checkout, save_participation) => {
    return async (competitor, participation_id) => {
        const checkout_session = await create_participation_checkout(participation_id);
        await save_participation(unpaid_participation(competitor, checkout_session));
        return ok({checkout_url: checkout_session.url});
    }
}

export const office_participation_register_service = (save_participation, get_participation) => {
    return async (payment_confirmation) => {
        try{
            if(payment_confirmation.status === "REJECTED")
                return err({message: "payment rejected", ref: payment_confirmation});
            const participation = await get_participation(payment_confirmation.checkout_session_id);
            if(!participation) return err({message: "participation not found", ref: payment_confirmation});
            await save_participation(paid_participation(participation.competitor, participation.id));
            return ok();
        }catch (error){
            return err({message: error.message, ref: payment_confirmation});
        }
    }
}
