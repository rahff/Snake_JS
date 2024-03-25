import {approve, reject} from "../common/decisions.js";
import {non_verified_competitor} from "./model.js";



export const office_registration_service = (save, is_email_exist, hash_password) => {
    return async credentials => {
        const email_already_exist = await is_email_exist(credentials.email);
        if(email_already_exist) return reject({reason: "email already exist"});
        const competitor = non_verified_competitor(credentials, hash_password(credentials.password));
        await save(competitor);
        return approve(competitor.email);
    }
}