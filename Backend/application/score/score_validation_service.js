import {err, ok, query} from "../common/common.js";



export const score_validation = get_game_snapshots => {
    return async submitted => {
        const {competition_id, competitor_email} = submitted
        return query(get_game_snapshots, competition_id, competitor_email)
            .then(_ => _.if_non_empty_list(apply_score_verification(submitted)))
            .then(_ => _.or_else_do(rejection))
            .catch(error => err(error));
    }
}

const apply_score_verification = submitted => async snapshots => {
    const state_consistency = verify_positions_consistency(snapshots);
    if(!state_consistency) return rejection();
    return ok(submitted);
}

const verify_positions_consistency = snapshot_list => {
    return snapshot_list.map(check_position).reduce(sum) === 0;
}

const check_position = snapshot => {
    return position_equal(snapshot.apple_position, snapshot.snake_head) ? 0 : 1
}

const position_equal = (position, other) => position.x === other.x && position.y === other.y

const sum = (acc, value) => acc + value

const rejection = () => err({ message: 'has been rejected by the commissar' });