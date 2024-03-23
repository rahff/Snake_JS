import {office_registration_service} from "../../application/competitor/office_registration_service.js";
import {in_memory_save_competition} from "../../data_access/competition/organization_data-access.js";
import {fake_hash_password} from "../../services/security/password_service.js";
import {fake_email_checker} from "../../data_access/competitor/competitor_data_access.js";

describe('Registration office', () => {
    let competitor_registration;
    let save_competitor;
    let hash_password;
    let is_email_exist;
    let db;
    beforeEach(() => {
        db = [];
        save_competitor = in_memory_save_competition(db);
        hash_password = fake_hash_password;
        is_email_exist = fake_email_checker;
        competitor_registration = office_registration_service(save_competitor, is_email_exist, hash_password);
    })

    it("A random guy registers to take part in competitions", async () => {
        const validate_form_data = {
            name: "Rahff",
            email: "rahff@gmail.com",
            password: "Mot2$asse"
        }

        const decision = await competitor_registration(validate_form_data);
        expect(decision.approved).toBeTrue();
        expect(decision.data).toEqual(validate_form_data);
        expect(db).toContain({...validate_form_data, password: "########"});
    });

    it("cannot use an email that already registered", async () => {
        const validate_form_data = {
            name: "Rahff",
            email: "exist@gmail.com",
            password: "Mot2$asse"
        };
        const decision = await competitor_registration(validate_form_data);
        expect(decision.rejected).toEqual({reason: "email already exist"});
        expect(db).not.toContain({...validate_form_data, password: "########"});
    })
});