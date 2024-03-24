import {in_memory_get_snapshot} from "../../data_access/score/score_data_access.js";
import {office_score_validation_service} from "../../application/score/office_score_validation_service.js";

describe('Score validation', () => {
    let validate_score;
    let get_game_state_snapshot;

    it("a score submitted with no game state snapshot is rejected", async () => {
        get_game_state_snapshot = in_memory_get_snapshot([]);
        validate_score = office_score_validation_service(get_game_state_snapshot);
        const submitted_score = {competition_id: "competition_id", competitor_email: "rahff@gmail.com", score: 50};
        const result = await validate_score(submitted_score);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "has been rejected by the commissar"})
    })
});