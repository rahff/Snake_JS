import {participation_controller} from "../../controller/competitor/competitor_controllers.js";
import {participation_module} from "../../dependency_injection/participation_module.js";
import {MockRequest, MockResponse} from "./utils/mocks.js";
import {competition_db} from "../../data_access/competition/in_memory_data.js";



describe('Competitors endpoint Api', () => {

    let participation_checkout;

    beforeEach(() => {
        participation_checkout = participation_controller(participation_module.checkout_service);
    })

    it("POST on  /api/competitors/participate/:competition_id", async () => {
        const authenticated_competitor = {
            name: "Rahff",
            email: "rahff@gmail.com",
            verified: true,
            id: "123"
        }
        const req = new MockRequest({}, {competition_id: "competition_id_1"});
        const res = new MockResponse();
        req.setAuthentication(authenticated_competitor);
        await participation_checkout(req, res);
        expect(res._status).toBe(302);
        expect(res.terminated).toBeTrue();
        expect(competition_db.participations).toContain({
            id: "checkout_session_id",
            competitor: {id: "123", email: "rahff@gmail.com", name: "Rahff", verified: true},
            paid: false,
            competition_id: "competition_id_1"
        });
    });
});