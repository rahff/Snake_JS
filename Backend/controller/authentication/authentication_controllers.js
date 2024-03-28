import {doing, ok} from "../../application/common/common.js";
import {
    bad_request_exception,
    command,
    internal_server_exception,
    ok_status,
    unauthorized_exception
} from "../common/common.js";
import {registration_service} from "../../application/competitor/registration_service.js";

export const log_in_controller = (authentication_service) => {
    return async (req, res) => {
        doing(credentials_validation, req.body)
            .is_ok_do(try_log_in(authentication_service, res))
            .then(_ => _.or_else_do(unauthorized_exception(res)))
            .catch(internal_server_exception(res));
    }
}

const try_log_in = (login_command, res) => async (credentials) => {
    return command(login_command, credentials.data)
        .then(_ => _.is_ok_do(ok_status(res)))
        .then(_ => _.or_else_do(unauthorized_exception(res)));
}

const credentials_validation = (credentials) => ok(credentials);


export const register_competitor_controller = (registration_service, authentication_service) => {
    return async (req, res) => {
        const user_infos = req.body;
        return doing(validate_competitor_infos, user_infos)
        .is_ok_do(try_to_signup(registration_service, authentication_service, res))
        .then(_ => _.or_else_do(bad_request_exception(res)))
        .catch(internal_server_exception(res));
    }
}

const try_to_signup = (registration_service, authentication_service, res) => async user_infos => {
    return command(registration_service, user_infos)
        .then(_ => _.is_ok_do_async(authenticate(authentication_service)))
        .then(_ =>_.or_else_do(internal_server_exception(res)))
        .catch(internal_server_exception(res));
}

const authenticate = (authentication_service, res) => async credentials => {
    const {email, password} = credentials.data;
    const result = await authentication_service({email, password});
    res.status(200).json(result.data);
    return result;
}

const validate_competitor_infos = (data) => ok(data);