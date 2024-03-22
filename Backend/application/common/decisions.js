export const approve = (data) => ({is_ok: true, data});
export const reject = (error) => ({is_ok: false, error});