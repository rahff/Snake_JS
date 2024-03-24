import {office_score_registration_service} from "../../application/score/office_score_registration_service.js";
import {in_memory_save_score} from "../../data_access/score/score_data_access.js";

describe('Score Recorder', () => {

    let score_recording;
    let save_score;
    let db;
    beforeEach(() => {
        db = [];
        save_score = in_memory_save_score(db);
        score_recording = office_score_registration_service(save_score);
    })

    it("the competitor has beaten his best score", async () => {
        const score = {competitor_email: "rahff@gmail.com", competition_id: "competition_id", score: 50};
        const result = await score_recording(score);
        expect(result.is_ok).toBeTrue();
        expect(db).toContain(score);
    });
});