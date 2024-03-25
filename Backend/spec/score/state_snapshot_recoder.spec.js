import {in_memory_save_snapshot} from "../../data_access/score/score_data_access.js";
import {state_snapshot_recorder} from "../../application/score/office_score_registration_service.js";

describe('State Snapshot recorder', () => {

    let record_snapshot;
    let save_snapshot;
    let db;

    beforeEach(() => {
        db = [];
        save_snapshot = in_memory_save_snapshot(db);
        record_snapshot = state_snapshot_recorder(save_snapshot)
    });

    it("A significant event occured during a competition game session", async () => {
        const snapshot = {
            apple_position: {x: 12, y: 7},
            snake_head: {x: 12, y: 7},
            speed: 115.2,
            code: 110.2,
            score: 5,
            competition_id: "competition_id"
        }
        const result = await record_snapshot(snapshot);
        expect(result.is_ok).toBeTrue();
        expect(db).toContain(snapshot);
    })
});