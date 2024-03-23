import {approve, reject} from "../common/decisions.js";



export const office_registration_service = (save, is_email_exist, hash_password) => {
    return async (competitor) => {
        const email_already_exist = await is_email_exist(competitor.email);
        if(email_already_exist) return reject({reason: "email already exist"});
        const hashed_password = hash_password(competitor.password);
        await save({...competitor, password: hashed_password});
        return approve(competitor);
    }
}