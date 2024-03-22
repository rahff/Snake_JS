export const unpaid_participation = (competitor, checkout_session) => ({
    id: checkout_session.id,
    competitor,
    paid: false
})

export const paid_participation = (competitor, id) => ({
    id,
    competitor,
    paid: true
})