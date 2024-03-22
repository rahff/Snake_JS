

export const log_in_controller = (office_authentication_service) => async (req, res) => {
    const log_in_request = req.body;
    const decision = await office_authentication_service(log_in_request);
    if(decision.is_ok) return res.status(200).json(decision.data);
    else return res.status(401).json(decision.error);
}

export const participation_controller = (office_participation_service) => async (req, res) => {
    try{
        const participation_id = req.params.participation_id;
        const competitor = req.authentication;
        const result = await office_participation_service(competitor, participation_id);
        res.redirect(result.data.checkout_url);
    }catch (error){
        res.status(500).json(error);
    }
}

export const payment_events_controller = (office_participation_registration) => async (req, res) => {
    const payment_confirmation = get_payment_confirmation(req.body);
    if(!payment_confirmation) res.status(200).end();
    const result = await office_participation_registration();
    if(result.is_ok) res.status(200).end();
    else res.status(500).json(result.error);
}

const get_payment_confirmation = (stripe_event) => {
    if(stripe_event.type === "non_relevant") return null;
    return {checkout_session_id: "checkout_session_id", status: "CONFIRMED"};
}