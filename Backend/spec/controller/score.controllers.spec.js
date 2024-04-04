import {score_registration_controller, snapshot_controller} from "../../controller/score/score_controllers.js";
import {score_module} from "../../dependency_injection/score_module.js";
import {MockRequest, MockResponse} from "./utils/mocks.js";
import {score_db} from "../../data_access/score/in_memory_data.js";
import {snapshot_1, snapshot_3} from "../fixtures/snapshot.fixture.js";
import {feed_db} from "./utils/utils.js";



describe('Snapshot registration', () => {
    let controller;

    beforeEach(() =>{
        controller = snapshot_controller(score_module.snapshot_recording_service)
    })

    it("POST on /api/scores/snapshot", async () => {
        const req = new MockRequest({...snapshot_1});
        const res = new MockResponse();
        await controller(req, res);
        expect(res.terminated).toBeTrue();
        expect(res._status).toBe(200);
        expect(score_db.snapshots).toContain({...snapshot_1});
    });
});

describe('Score validating and recording', () => {
    let controller;

    beforeEach(() => {
        feed_db(score_db.snapshots, [snapshot_1, snapshot_3])
        controller = score_registration_controller(
            score_module.registration_service,
            score_module.validation_service
        );
    });

    it("Post on /api/scores/register", async () => {
        const score = {competition_id: "competition_id", competitor_email: "rahff@gmail.com", score: 10}
        const req = new MockRequest(score);
        const res = new MockResponse();
        await controller(req, res);
        expect(res.terminated).toBeTrue();
        expect(res._status).toBe(201);
        expect(score_db.scores).toContain(score);
    })
});