;

class Name {
    #format =  /^[a-zA-Z0-9\-'. ][^<>]{0,49}$/;
    constructor(name) {
        this._value = name;
        this.#check_validity(this._value)
    }

    #check_validity(name){
        if(!this.#format.test(name))
            throw "invalid name";
    }

    value(){
        return Object.freeze(this._value);
    }
}

export const a_name = name => {
    try{
        return new Name(name).value();
    }catch(error){
        throw error;
    }
}