

class Email {

    #format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    constructor(email) {
        this._value = email;
        this.#check_validity(this._value);
    }

    #check_validity(email){
        if(!this.#format.test(email))
            throw "invalid email format";
    }

    value() {
        return Object.freeze(this._value);
    }
}

export const an_email = email => {
    try {
        return new Email(email).value();
    }catch (error) {
         throw error;
    }
}