export const participate = fetch => async (competition_id, url) => {
    await fetch(url+"/"+competition_id, {method: "POST"});
}


export const participate_action = participate => async event => {
    const clicked = event.target;
    const competition_id = clicked.getAttribute('data-competition');
    const url = clicked.getAttribute('data-url');
    await participate(competition_id, url);
}
