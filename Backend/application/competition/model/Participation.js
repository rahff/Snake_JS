class Participation {

    constructor(id, competitor, competition_id, paid) {
        this.id = id;
        this.competitor = competitor;
        this.competition_id = competition_id;
        this.paid = paid;
    }

    value() {
        return Object.freeze({
            id: this.id,
            competitor: Object.freeze({...this.competitor}),
            competition_id: this.competition_id,
            paid: this.paid
        })
    }
}

export const unpaid_participation = (competitor, checkout_session) => {
    return new Participation(
        checkout_session.id,
        competitor,
        checkout_session.competition_id,
        false
    ).value();
}

export const paid_participation = unpaid => {
    return new Participation(
        unpaid.id,
        unpaid.competitor,
        unpaid.competition_id,
        true
    ).value();
}