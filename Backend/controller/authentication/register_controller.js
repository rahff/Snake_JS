import {an_error, doing, err, ok} from "../../application/common/common.js";
import {
    bad_request_exception,
    command,
    internal_server_exception,
     ok_status_result,
    unauthorized_exception
} from "../common/common.js";
import {an_email} from "../validation/Email.js";
import {a_password} from "../validation/Password.js";
import {a_name} from "../validation/Name.js";
import {an_id} from "../validation/Id.js";





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
    return command(registration_service, user_infos.data)
        .then(_ => _.is_ok_do_async(authenticate(authentication_service, res, user_infos.data.password)))
        .then(_ =>_.or_else_do(internal_server_exception(res)))
        .catch(internal_server_exception(res));
}

const authenticate = (authentication_service, res, password) => async email_result => {
    const email = email_result.data;
    const result = await authentication_service({email, password});
    res.status(200).json(result.data);
    return result;
}

const validate_competitor_infos = (data) => {
    try{
        const email = an_email(data.email);
        const password = a_password(data.password);
        const name = a_name(data.name);
        const id = an_id(data.id);
        return ok({email, password, name, id});
    }catch (error){
        return err(an_error(error))
    }
};