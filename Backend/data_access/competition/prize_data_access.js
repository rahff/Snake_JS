export const in_memory_save_prize = data => async prize => {
    data.push(prize);
}

export const in_memory_get_prize = data => competition_id => data.find(prize => prize.competition_id === competition_id);