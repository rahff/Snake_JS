export const save_on_in_memory = (db, item, key_id) => {
    const index = db.findIndex(p => p[key_id] === item[key_id]);
    if(index !== -1) db[index] = item;
    else db.push(item);
}