class Prize {

    constructor(competition_id, estimated_amount) {
        this.competition_id = competition_id;
        this.estimated_amount = estimated_amount
    }
    value(){
        return Object.freeze({
            competition_id: this.competition_id,
            estimated_amount: this.estimated_amount
        });
    }
}

export const one_euro_prize = competition_id => new Prize(competition_id, 1).value();
export const increment_prize = prize => {
    const incremented = prize.estimated_amount +1;
    return new Prize(prize.competition_id, incremented).value();
}