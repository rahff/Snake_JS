import {doing, ok} from "../../application/common/common.js";
import {
    bad_request_exception,
    command,
    internal_server_exception, ok_status,
    validation_exception
} from "../common/common.js";


export const organize_competition_controller = (organization_service) => {
    return async (req, res) => {
        return doing(validate, req.body)
        .is_ok_do(create_competition(res, organization_service))
        .then(_ => _.or_else_do(validation_exception(res)))
        .catch(internal_server_exception(res));
    }
}

const create_competition = (res, create) => async competition => {
    return command(create, competition)
        .then(_ => _.is_ok_do(ok_status(res)))
        .then(_ => _.or_else_do(bad_request_exception(res)))
}

const validate = (data) => {
    return ok(data);
}
