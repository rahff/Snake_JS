import {
    bad_request_exception,
    command,
    internal_server_exception,
    ok_status,
    validation_exception
} from "../common/common.js";
import {doing, err, ok} from "../../application/common/common.js";



export const score_registration_controller = (score_register_service, score_validation_service) => {
    return (req, res) => {
        return doing(validate_request_body, req.body)
        .is_ok_do(validating_and_recording_score(score_validation_service, score_register_service, res))
        .then(_ => _.or_else_do(validation_exception(res)))
        .catch(internal_server_exception(res));
    }
}

const validating_and_recording_score = (validation_service, registration_service, res) => result => {
    return command(validation_service, result.data)
        .then(_ => _.is_ok_do(record_score(registration_service, res)))
        .then(_ => _.or_else_do(bad_request_exception(res)))
        .catch(error => err(error))
}

const record_score = (registration_service, res) => async score => {
    const result = await registration_service(score.data);
    res.status(201).end();
    return result;
}

const validate_request_body = (body_to_validate) => ok(body_to_validate);


export const snapshot_controller = snapshot_service => {
    return (req,res) => {
        return command(snapshot_service, req.body)
        .then(_ => _.is_ok_do(ok_status(res)))
        .catch(internal_server_exception(res));
    }
}