import {approve, reject} from "../common/decisions.js";



export const office_authentication_service = (get_competitor, password_matcher, jwt_service) => {
    return async credentials => {
        const competitor = await get_competitor(credentials.email);
        const match_password = password_matcher(competitor.password, credentials.password);
        if(match_password) return approve({token: jwt_service(competitor)})
        return reject({reason: "invalid credentials"});
    }
}
