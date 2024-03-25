export const in_memory_save_score = db => score => {
    db.push(score);
}

export const in_memory_get_snapshot = data => (competition_id, competitor_id) => data;

export const in_memory_save_snapshot = data => snapshot => data.push(snapshot);