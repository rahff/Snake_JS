import {approve, query, reject} from "../common/common.js";



export const authentication_service = (get_competitor, password_matcher, jwt_service) => {
    return async credentials => {
        return query(get_competitor, credentials.email)
        .then(_ => _.if_present(authenticate(password_matcher, jwt_service, credentials.password)))
        .then(_ => _.or_else_do(bad_credentials));
    }
}


const authenticate = (password_matcher, jwt_service, candidate_password) => async competitor => {
    const match_password = password_matcher(competitor.password, candidate_password);
    if(match_password) return approve({token: jwt_service(competitor)});
    return bad_credentials();
}

const bad_credentials = () => reject({reason: "invalid credentials"})