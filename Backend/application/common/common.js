export const ok = data => ({is_ok: true, data});
export const err = error => ({is_ok: false, error});
export const approve = data => ({approved: true, data});
export const reject = rejected => ({approved: false, rejected});


export const doing = (fn, ...args) => {
    const result = fn(...args);
    return { is_ok_do: ok_fn(result) };
}

export const query = async (query, ...args) => {
    const data = await query(...args);
    return {
        if_present: present_fn(data),
        if_not_exist: not_exist_fn(data),
        if_non_empty_list: non_empty_list_fn(data),
    }
}



const non_empty_list_fn = data => async fn => {
    let result;
    if(data.length) result = await fn(data);
    return {
        or_else_do: null_fn(result)
    }
}

const present_fn = data => async fn => {
    let result;
    if(data) result = await fn(data);
    return {
        or_else_do: null_fn(result),
        unwrap: unwrap_fn(result)
    }
}

export const unwrap_fn = result => () => {
    return result;
}

const not_exist_fn = data => async fn => {
    let result;
    if(!data) result = await fn(data);
    return {
        or_else_do: null_fn(result)
    }
}

export const ok_fn = result => async fn => {
    if(result.is_ok) result = await fn(result);
    return {
        or_else_do: else_fn(result),
        unwrap: unwrap_fn(result)
    }
}


export const else_fn = result => fn => {
    if(!result.is_ok) fn(result);
    return result;
}

const null_fn = result => fn => {
    if (!result) return fn();
    else return result;
}
