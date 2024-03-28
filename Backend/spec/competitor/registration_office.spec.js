import {registration_service} from "../../application/competitor/registration_service.js";
import {in_memory_save_competition} from "../../data_access/competition/organization_data_access.js";
import {fake_hash_password} from "../../services/security/password_service.js";
import {fake_email_checker, in_memory_save_competitor} from "../../data_access/competitor/competitor_data_access.js";



describe('Registration office', () => {
    let competitor_registration;
    let save_competitor;
    let hash_password;
    let is_email_exist;
    let db;

    beforeEach(() => {
        db = [];
        save_competitor = in_memory_save_competitor(db);
        hash_password = fake_hash_password;
        is_email_exist = fake_email_checker;
        competitor_registration = registration_service(save_competitor, is_email_exist, hash_password);
    });

    it("A random guy registers to take part in competitions", async () => {
        const validate_form_data = {
            name: "Rahff",
            email: "rahff@gmail.com",
            password: "Mot2$asse"
        };
        const decision = await competitor_registration(validate_form_data);
        expect(decision.approved).toBeTrue();
        expect(decision.data).toEqual("rahff@gmail.com"); // for sending email confirmation
        expect(db).toContain({...validate_form_data, password: "########", verified: false});
    });

    it("cannot use an email that already registered", async () => {
        const validate_form_data = {
            name: "Rahff",
            email: "exist@gmail.com",
            password: "Mot2$asse"
        };
        const decision = await competitor_registration(validate_form_data);
        expect(decision.rejected).toEqual({reason: "email already exist"});
        expect(db.length).toBe(0);
    });
});