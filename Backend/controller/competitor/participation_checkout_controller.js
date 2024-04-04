import {command, internal_server_exception} from "../common/common.js";



export const participation_checkout_controller = (participation_service) => {
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

