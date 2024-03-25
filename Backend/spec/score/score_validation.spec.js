import {in_memory_get_snapshot} from "../../data_access/score/score_data_access.js";
import {office_score_validation_service} from "../../application/score/office_score_validation_service.js";



const snapshot_1 = {
    apple_position: {x: 12, y: 7},
    snake_head: {x: 12, y: 7},
    speed: 115.2,
    code: 110.2,
    score: 5,
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
        validate_score = office_score_validation_service(get_game_state_snapshot);
        const submitted_score = {competition_id: "competition_id", competitor_email: "rahff@gmail.com", score: 50};
        const result = await validate_score(submitted_score);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "has been rejected by the commissar"});
    });

    it("must have a consistent code", async () => {
        get_game_state_snapshot = in_memory_get_snapshot([snapshot_1]);
        validate_score = office_score_validation_service(get_game_state_snapshot);
        const submitted_score = {competition_id: "competition_id", competitor_email: "rahff@gmail.com", score: 50};
        const result = await validate_score(submitted_score);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "has been rejected by the commissar"});
    });

    it("must have consistent state s positions", async () => {
        get_game_state_snapshot = in_memory_get_snapshot([snapshot_1, snapshot_2]);
        validate_score = office_score_validation_service(get_game_state_snapshot);
        const submitted_score = {competition_id: "competition_id", competitor_email: "rahff@gmail.com", score: 5};
        const result = await validate_score(submitted_score);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "has been rejected by the commissar"});
    });
});