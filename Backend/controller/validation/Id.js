

class Id {
    #format = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    constructor(id) {
        this._value = id;
        this.#check_validity();
    }

    #check_validity(){
        if(!this.#format.test(this._value))
            throw "invalid id format";
    }

    value(){
        return Object.freeze(this._value);
    }
}

export const an_id = id => {
    try{
        return new Id(id).value();
    }catch(error){
        throw error;
    }
}