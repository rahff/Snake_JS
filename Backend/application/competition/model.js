import {err, ok} from "../common/common.js";

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
    return ok({...data});
}

const invalid_competition_period = (now, period) => {
    return now > period.begin || period.end < period.begin;
}



/*
type Participation = {
    id: string,
    competitor: {id: string, email: string, name: string},
    paid: boolean
}
* */

export const unpaid_participation = (competitor, checkout_session) => ({
    id: checkout_session.id,
    competitor,
    competition_id: checkout_session.competition_id,
    paid: false
})

export const paid_participation = unpaid_participation => ({
    ...unpaid_participation,
    paid: true
})

/*
type Prize = {
    competition_id: string,
    estimated_amount: number
}
* */

export const one_euro_prize = competition_id =>({competition_id, estimated_amount: 1})
export const increment_prize = prize =>({...prize, estimated_amount: ++prize.estimated_amount})