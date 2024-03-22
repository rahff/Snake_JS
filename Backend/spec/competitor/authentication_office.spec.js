import {office_authentication_service} from "../../application/competitor/office_authentication_service.js";
import {in_memory_get_competitor} from "../../data_access/competitor/competitor_data_access.js";
import {fake_password_matcher} from "../../security/password_service.js";
import {fake_jwt_token_builder} from "../../security/jwt_service.js";



describe('Authentication office', () => {
    let competitor_log_in;

    beforeEach(() => {
        competitor_log_in = office_authentication_service(in_memory_get_competitor, fake_password_matcher, fake_jwt_token_builder);
    })

    it("a competitor identify himself to enter the competition", async () => {
        const log_in_req = {email: "rahff@gmail.com", password: "123456"};
        const decision = await competitor_log_in(log_in_req);
        expect(decision.is_ok).toBeTrue();
        expect(decision.data).toEqual({token: "jwt_token_rahff@gmail.com"});
    })

    it("a imposter try to identify himself to enter the competition", async () => {
        const log_in_req = {email: "imposter@gmail.com", password: "%%%%%"};
        const decision = await competitor_log_in(log_in_req);
        expect(decision.is_ok).toBeFalse();
        expect(decision.error).toEqual({message: "invalid credentials"});

    })
});