import {err, ok} from "../common/result.js";

/*
type Competition = {
    id: string,
    name: string,
    period: {
        begin: Date,
        end: Date
    },
    img_miniature: string,
    game_id: number
}
*/


export const competition = (data, now) => {
    if(invalid_competition_period(now, data.period))
        return err({message: "must begins in future and ends after its beginning"})
    return ok({...data})
}

const invalid_competition_period = (now, period) => {
    return now > period.begin || period.end < period.begin;
}
