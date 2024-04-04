import {an_error, err, ok} from "../../common/common.js";


class Competitor {
    constructor(id, name, email, password, verified) {
        this.id = id
        this.name = name;
        this.email = email;
        this.password = password;
        this.verified = verified;
    }

    value(){
        return Object.freeze({
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            verified: this.verified
        });
    }
}



export const non_verified_competitor = (data, hashed_password) => {
    try{
        return ok(new Competitor(
            data.id,
            data.name,
            data.email,
            hashed_password,
            false
        ).value());
    }catch(error){
        return err(an_error(error.message))
    }

}