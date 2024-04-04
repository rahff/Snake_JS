import {an_error, doing, err, ok} from "../../application/common/common.js";
import {command, internal_server_exception, ok_status_result, unauthorized_exception} from "../common/common.js";
import {an_email} from "../validation/Email.js";

export const log_in_controller = (authentication_service) => {
    return async (req, res) => {
        return doing(credentials_validation, req.body)
            .is_ok_do(try_log_in(authentication_service, res))
            .then(_ => _.or_else_do(unauthorized_exception(res)))
            .catch(internal_server_exception(res));
    }
}

const try_log_in = (login_command, res) => async (credentials) => {
    return command(login_command, credentials.data)
        .then(_ => _.is_ok_do(ok_status_result(res)))
        .then(_ => _.or_else_do(unauthorized_exception(res)));
}

const credentials_validation = (credentials) => {
    try {
        const email = an_email(credentials.email);
        return ok({email, password: credentials.password})
    }catch(error){
        return err(an_error("invalid credentials"));
    }
};
