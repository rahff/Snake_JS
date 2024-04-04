import {in_memory_get_snapshot} from "../../../data_access/score/score_data_access.js";
import {score_validation} from "../../../application/score/score_validation_service.js";
import {snapshot_1, snapshot_2, snapshot_3} from "../../fixtures/snapshot.fixture.js";


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