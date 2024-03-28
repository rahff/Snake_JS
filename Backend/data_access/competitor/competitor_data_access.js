export const in_memory_get_competitor = db => async email => db.find(user => user.email === email);

export const fake_email_checker = email => email !== "rahff@gmail.com";
export const in_memory_email_checker = db => email => db.some(user => user.email === email);

export const in_memory_save_competitor = db => competitor => db.push(competitor)