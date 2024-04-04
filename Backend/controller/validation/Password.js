

class Password {

    #format = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;
    constructor(password) {
        this._value = password;
        this.#check_validity(this._value);
    }

    #check_validity(password) {
        if(!this.#format.test(password))
            throw `
            password must have at least 
            one uppercase, one special 
            character and one digit`;
    }

    value(){
        return Object.freeze(this._value);
    }
}

export const a_password = password => {
    try{
        return new Password(password).value();
    }catch(error){
        throw error;
    }
}