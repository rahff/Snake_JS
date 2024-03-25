import {err, ok} from "../common/result.js";



export const office_score_validation_service = get_game_snapshots => {
    return async submitted => {
        const state_snapshots = await get_game_snapshots(submitted.competition_id, submitted.competitor_email);
        if(!state_snapshots.length) return rejection();
        const match_code = verify_code_consistence(state_snapshots, submitted.score);
        const positions_consistency = verify_positions_consistency(state_snapshots);
        if(!match_code || !positions_consistency) return rejection();
        return ok();
    }
}

const verify_positions_consistency = snapshot_list => {
    return snapshot_list.map(check_position).reduce(sum) === 0;
}

const check_position = snapshot => {
    return position_equal(snapshot.apple_position, snapshot.snake_head) ? 0 : 1
}

const position_equal = (position, other) => position.x === other.x && position.y === other.y

const verify_code_consistence = (snapshot_list, submitted_score) => {
    return snapshot_list.map(check_code(submitted_score)).reduce(sum) === 0;
}

const sum = (acc, value) => acc + value

const check_code = submitted_score => snapshot => {
    return snapshot.code === snapshot_code(snapshot, submitted_score) ? 0 : 1
}

const snapshot_code = (snapshot, submitted_score) => {
    const speed = snapshot.speed;
    const score = submitted_score;
    const i = score / 5;
    return (speed * i) - score;
}

const rejection = () => err({ message: 'has been rejected by the commissar' });