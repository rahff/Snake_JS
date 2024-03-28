import {approve, query, reject} from "../common/common.js";
import {non_verified_competitor} from "./model.js";



export const registration_service = (save, is_email_exist, hash_password) => {
    return async credentials => {
        return query(is_email_exist, credentials.email)
            .then(_ => _.if_not_exist(credentials_approving(save, hash_password, credentials)))
            .then(_ => _.or_else_do(email_rejection));
    }
}

const credentials_approving = (save, hash_password, credentials) => async _ => {
    const competitor = non_verified_competitor(credentials, hash_password(credentials.password));
    await save(competitor);
    return approve(competitor.email);
}

const email_rejection = () => reject({reason: "email already exist"});