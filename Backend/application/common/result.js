export const ok = (data) => ({is_ok: true, data});
export const err = (error) => ({is_ok: false, error});