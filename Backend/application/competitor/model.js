export const non_verified_competitor = (registered_guy, hashed_password) => ({
        ...registered_guy,
        password: hashed_password,
        verified: false
})