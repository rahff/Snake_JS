import {registration_service} from "../../../application/competitor/registration_service.js";
import {noop_hash_password} from "../../../services/security/password_service.js";
import {fake_email_checker, in_memory_save_competitor} from "../../../data_access/competitor/competitor_data_access.js";
import {
    competitor_form_fixture,
    competitor_form_fixture_2,
    competitor_invalid_fixture
} from "../../fixtures/competitor.fixture.js";



describe('Registration office', () => {
    let competitor_registration;
    let save_competitor;
    let hash_password;
    let is_email_exist;
    let db;

    beforeEach(() => {
        db = [];
        save_competitor = in_memory_save_competitor(db);
        hash_password = noop_hash_password;
        is_email_exist = fake_email_checker;
        competitor_registration = registration_service(save_competitor, is_email_exist, hash_password);
    });

    it("A random guy registers to take part in competitions", async () => {
        const decision = await competitor_registration({...competitor_form_fixture});
        expect(decision.is_ok).toBeTrue();
        expect(decision.data).toEqual("rahff@gmail.com"); // for sending email confirmation
        expect(db).toContain({...competitor_form_fixture, verified: false});
    });

    it("cannot use an email that already registered", async () => {
        const decision = await competitor_registration({...competitor_form_fixture_2});
        expect(decision.error).toEqual({message: "email already exist"});
        expect(db.length).toBe(0);
    });
});