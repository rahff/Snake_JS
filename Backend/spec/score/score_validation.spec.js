import {in_memory_get_snapshot} from "../../data_access/score/score_data_access.js";
import {score_validation} from "../../application/score/score_validation_service.js";


const snapshot_1 = {
    apple_position: {x: 12, y: 7},
    snake_head: {x: 12, y: 7},
    speed: 115.2,
    code: 110.2,
    score: 5,
    competition_id: "competition_id"
}

const snapshot_3 = {
    apple_position: {x: 18, y: 7},
    snake_head: {x: 18, y: 7},
    speed: 110.592,
    code: 211.184,
    score: 10,
    competition_id: "competition_id"
}

const snapshot_2 = {
    apple_position: {x: 18, y: 7},
    snake_head: {x: 12, y: 5},
    speed: 115.2,
    code: 110.2,
    score: 5,
    competition_id: "competition_id"
}

describe('Score validation', () => {

    let validate_score;
    let get_game_state_snapshot;

    it("must have game state snapshot", async () => {
        get_game_state_snapshot = in_memory_get_snapshot([]);
        validate_score = score_validation(get_game_state_snapshot);
        const submitted_score = {competition_id: "competition_id", competitor_email: "rahff@gmail.com", score: 50};
        const result = await validate_score(submitted_score);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "has been rejected by the commissar"});
    });

    it("must have consistent state s positions", async () => {
        get_game_state_snapshot = in_memory_get_snapshot([snapshot_1, snapshot_2]);
        validate_score = score_validation(get_game_state_snapshot);
        const submitted_score = {competition_id: "competition_id", competitor_email: "rahff@gmail.com", score: 5};
        const result = await validate_score(submitted_score);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "has been rejected by the commissar"});
    });

    it("must say ok if its valid", async () => {
        get_game_state_snapshot = in_memory_get_snapshot([snapshot_1, snapshot_3]);
        validate_score = score_validation(get_game_state_snapshot);
        const submitted_score = {competition_id: "competition_id", competitor_email: "rahff@gmail.com", score: 10};
        const result = await validate_score(submitted_score);
        expect(result.is_ok).toBeTrue();
        expect(result.data).toEqual(submitted_score);
    });
});