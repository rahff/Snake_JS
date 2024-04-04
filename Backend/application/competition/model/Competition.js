import {err, ok} from "../../common/common.js";

class Competition {

    constructor(id, name, period, img, game_id, now) {
        this.id = id;
        this.name = name;
        this.period = period;
        this.img_miniature = img;
        this.game_id = game_id;
        this.#check_invariants(now, this.period);
    }

    #check_invariants(now){
        if(this.#invalid_competition_period(now))
            throw "must begins in future and ends after its beginning";
    }

    #invalid_competition_period(now) {
        return now > this.period.begin || this.period.end < this.period.begin;
    }

    value() {
        return Object.freeze({
            id: this.id,
            name: this.name,
            period: Object.freeze({
                ...this.period
            }),
            img_miniature: this.img_miniature,
            game_id: this.game_id
        })
    }
}

export const competition = (data, now) => {
    try{
        return ok(new Competition(data.id, data.name, data.period, data.img_miniature, data.game_id, now).value())
    }catch (error) {
        return err({message: error.message});
    }
}
