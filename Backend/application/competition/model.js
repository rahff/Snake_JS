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

export const paid_participation = (unpaid_participation) => ({
    ...unpaid_participation,
    paid: true
})

/*
type Prize = {
    competition_id: string,
    estimated_amount: number
}
* */

export const one_euro_prize = (competition_id) =>({competition_id, estimated_amount: 1})