import {
    payment_webhook_controller, STRIPE_CHECKOUT_SUCCEED
} from "../../controller/competitor/payment_webhook_controller.js";
import {participation_module} from "../../dependency_injection/participation_module.js";
import {MockRequest, MockResponse} from "./utils/mocks.js";
import {competition_db} from "../../data_access/competition/in_memory_data.js";
import {feed_db} from "./utils/utils.js";
import {participation_fixture} from "../fixtures/participation.fixture.js";
import {prize_fixture} from "../fixtures/prize.fixture.js";




describe('Payment Webhook', () => {

    let payment_webhook;

    beforeEach(() => {
        payment_webhook = payment_webhook_controller(participation_module.registration_service);
        feed_db(competition_db.participations, [{...participation_fixture}])
        feed_db(competition_db.prizes, [{...prize_fixture}])
    })

    it("POST on /api/competitors/participate/confirm-payment", async () => {
        const payment_confirmation = {type: STRIPE_CHECKOUT_SUCCEED};
        const req = new MockRequest(payment_confirmation);
        const res = new MockResponse();
        await payment_webhook(req, res);
        expect(res._status).toBe(200);
        expect(competition_db.participations[0].paid).toBeTrue();
        expect(competition_db.prizes).toContain({
            competition_id: "competition_id",
            estimated_amount: 2
        });
    });
});