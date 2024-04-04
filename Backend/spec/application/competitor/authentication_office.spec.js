import {authentication_service} from "../../../application/competitor/authentication_service.js";
import {in_memory_get_competitor} from "../../../data_access/competitor/competitor_data_access.js";
import {fake_password_matcher} from "../../../services/security/password_service.js";
import {fake_jwt_token_builder} from "../../../services/security/jwt_service.js";
import {competitor_fixture_2} from "../../fixtures/competitor.fixture.js";



describe('Authentication office', () => {
    let competitor_log_in;
    let db;

    beforeEach(() => {
        db = [competitor_fixture_2];
        competitor_log_in = authentication_service(
            in_memory_get_competitor(db),
            fake_password_matcher, fake_jwt_token_builder
        );
    })

    it("a competitor identify himself to enter the competition office", async () => {
        const log_in_req = {email: "rahff@gmail.com", password: "123456"};
        const result = await competitor_log_in(log_in_req);
        expect(result.is_ok).toBeTrue();
        expect(result.data).toEqual({token: "jwt_token_rahff@gmail.com"});
    })

    it("a imposter try to identify himself to enter the competition office", async () => {
        const log_in_req = {email: "imposter@gmail.com", password: "%%%%%"};
        const result = await competitor_log_in(log_in_req);
        expect(result.error).toEqual({message: "invalid credentials"});
    })
});