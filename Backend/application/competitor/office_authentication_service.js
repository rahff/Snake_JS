import {approve, reject} from "../common/decisions.js";



export const office_authentication_service = (get_competitor, password_matcher, jwt_service) => {
    return async (log_in_request) => {
        const competitor = await get_competitor(log_in_request.email);
        const match_password = password_matcher(competitor.password, log_in_request.password);
        if(match_password) return approve({token: jwt_service(competitor)})
        return reject({message: "invalid credentials"});
    }
}
