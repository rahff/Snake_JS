export const in_memory_save_score = db => score => {
    db.push(score);
}

export const in_memory_get_snapshot = db => (competition_id, competitor_id) => db;

export const in_memory_save_snapshot = db => snapshot => db.push(snapshot);