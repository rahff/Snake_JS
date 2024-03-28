import {else_fn, ok_fn, unwrap_fn} from "../../application/common/common.js";

export const bad_request_exception = res => result => {
    res.status(400).json(result.error);
}

export const validation_exception = res => result => {
    res.status(400).json(result.error);
}

export const unauthorized_exception = res => result => {
    res.status(401).json(result.error);
}

export const ok_status = res => (_) => {
    res.status(200).end();
}

export const internal_server_exception = res => error => res.status(500).json(error);

export const command = async (service, ...args) => {
    const result = await service(...args);
    return {
        is_ok_do: ok_fn_sync(result),
        is_ok_do_async: ok_fn(result)
    }
}

const ok_fn_sync = result => fn => {
    if(result.is_ok) fn(result);
    return {
        or_else_do: else_fn(result),
        unwrap: unwrap_fn(result)
    }
}