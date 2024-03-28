

export const in_memory_save_participation = db => async participation => {
    db.push(participation);
}

export const in_memory_get_participation = db => async id => {
    return db.find(participation => participation.id === id);
}