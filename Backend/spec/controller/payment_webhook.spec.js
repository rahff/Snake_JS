import {
    payment_events_controller,
    STRIPE_CHECKOUT_SUCCEED
} from "../../controller/competitor/competitor_controllers.js";
import {participation_module} from "../../dependency_injection/participation_module.js";
import {MockRequest, MockResponse} from "./utils/mocks.js";
import {competition_db} from "../../data_access/competition/in_memory_data.js";




describe('Payment Webhook', () => {
    let payment_webhook_controller;

    beforeEach(() => {
        payment_webhook_controller = payment_events_controller(participation_module.registration_service);
        competition_db.participations[0] = {
            id: "checkout_session_id",
            competitor: {id: "123", email: "rahff@gmail.com", name: "Rahff", verified: true},
            paid: false,
            competition_id: "competition_id"
        }
        competition_db.prizes[0] = {
            competition_id: "competition_id",
            estimated_amount: 1
        }
    })

    it("POST on /api/competitors/participate/confirm-payment", async () => {
        const payment_confirmation = {type: STRIPE_CHECKOUT_SUCCEED};
        const req = new MockRequest(payment_confirmation);
        const res = new MockResponse();
        await payment_webhook_controller(req, res);
        expect(res._status).toBe(200);
        expect(competition_db.participations[0].paid).toBeTrue();
        expect(competition_db.prizes).toContain({
            competition_id: "competition_id",
            estimated_amount: 2
        })
    })
});