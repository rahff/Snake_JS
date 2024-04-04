

export const feed_db = (db, items) => {
    for (let i = 0; i < items.length; i++) {
        db[i] = items[i]
    }
}