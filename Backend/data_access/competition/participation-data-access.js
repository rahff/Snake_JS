

export const in_memory_save_participation = (db) => async (participation) => {
    db.push(participation);
}

export const in_memory_get_participation = async (id) => {
    switch (id){
        case "not_matching":
            return null;
        case "hardware_fails":
            throw new Error("unknown error");
        default: return {
            id,
            competitor: {id: "123", email: "rahff@gmail.com", name: "Raphael"},
            paid: false
        }
    }
}