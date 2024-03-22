import {
    office_participation_register_service,
    office_participation_service
} from "../../application/competitor/office_participation_service.js";
import {fake_checkout_session} from "../../checkout/checkout.js";
import {
    in_memory_get_participation,
    in_memory_save_participation
} from "../../data_access/competitor/participation-data-access.js";



describe('Participation office', () => {
    let competitor_participate;
    let competitor_registration;

    beforeEach(() => {
        competitor_participate = office_participation_service(fake_checkout_session, in_memory_save_participation);
        competitor_registration = office_participation_register_service(in_memory_save_participation, in_memory_get_participation);
    })

    it("identified competitor register himself for competition", async () => {
        const competitor = {email: "rahff@gmail.com", id: "123", name: "Raphael"}
        const result = await competitor_participate(competitor, "participation_id");
        expect(result.is_ok).toBeTrue();
        expect(result.data.checkout_url).toBe("https://stripe.com/participation_id");
    })

    it("the office participation service received the payment confirmation", async () => {
        const payment_confirmation = {checkout_session_id: "checkout_session_id", status: "CONFIRMED"}
        const result = await competitor_registration(payment_confirmation);
        expect(result.is_ok).toBeTrue();
    })

    it("the checkout session does not match with any participation", async () => {
        const payment_confirmation = {checkout_session_id: "not_matching", status: "CONFIRMED"}
        const result = await competitor_registration(payment_confirmation);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "participation not found", ref: payment_confirmation});
    })

    it("An hardware failure occured", async () => {
        const payment_confirmation = {checkout_session_id: "hardware_fails", status: "CONFIRMED"}
        const result = await competitor_registration(payment_confirmation);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "unknown error", ref: payment_confirmation});
    })

    it("The payment_fails due to credit card expiration", async () => {
        const payment_confirmation = {checkout_session_id: "checkout_session_id", status: "REJECTED"}
        const result = await competitor_registration(payment_confirmation);
        expect(result.is_ok).toBeFalse();
        expect(result.error).toEqual({message: "payment rejected", ref: payment_confirmation});
    })
});