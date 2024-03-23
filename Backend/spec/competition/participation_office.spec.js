import {
    office_participation_register_service,
    office_participation_checkout_service
} from "../../application/competition/office_participation_service.js";
import {fake_checkout_session} from "../../services/checkout/checkout.js";
import {
    in_memory_get_participation,
    in_memory_save_participation
} from "../../data_access/competition/participation-data-access.js";
import {paid_participation, unpaid_participation} from "../../application/competition/model.js";



describe('Participation office', () => {
    let competitor_participate;
    let competitor_registration;
    let participation_db;
    const checkout_session = (url) => ({url, id: "checkout_session_id", competition_id: "competition_id"});
    const participation_to_paid = {
        id: "checkout_session_id",
        competitor: {id: "123", email: "rahff@gmail.com", name: "Raphael"},
        paid: false
    }
    beforeEach(() => {
        participation_db = [];
        competitor_participate = office_participation_checkout_service(fake_checkout_session, in_memory_save_participation(participation_db));
        competitor_registration = office_participation_register_service(in_memory_save_participation(participation_db), in_memory_get_participation);
    })

    it("competitor pays its participation for a given competition", async () => {
        const competitor = {email: "rahff@gmail.com", id: "123", name: "Raphael"}
        const competition_id = "competition_id";
        const result = await competitor_participate(competitor, competition_id);
        expect(result.is_ok).toBeTrue();
        expect(participation_db).toContain(unpaid_participation(competitor, checkout_session(result.data.url)))
        expect(result.data.checkout_url).toBe("https://stripe.com/competition_id");
    })

    it("the office participation service received the payment confirmation", async () => {
        const payment_confirmation = {checkout_session_id: "checkout_session_id", status: "CONFIRMED"}
        const result = await competitor_registration(payment_confirmation);
        expect(result.is_ok).toBeTrue();
        expect(participation_db).toContain(paid_participation(participation_to_paid))
    });

    it("the checkout session does not match with any participation", async () => {
        const payment_confirmation = {checkout_session_id: "not_matching", status: "CONFIRMED"}
        const result = await competitor_registration(payment_confirmation);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "participation not found", ref: payment_confirmation});
        expect(participation_db.length).toBe(0);
    });

    it("An hardware failure occured", async () => {
        const payment_confirmation = {checkout_session_id: "hardware_fails", status: "CONFIRMED"}
        const result = await competitor_registration(payment_confirmation);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "unknown error", ref: payment_confirmation});
        expect(participation_db.length).toBe(0);
    });

    it("The payment_fails due to credit card expiration", async () => {
        const payment_confirmation = {checkout_session_id: "checkout_session_id", status: "REJECTED"};
        const result = await competitor_registration(payment_confirmation);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "payment rejected", ref: payment_confirmation});
        expect(participation_db.length).toBe(0);
    });
});