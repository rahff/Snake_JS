import {register_competitor_controller} from "../../controller/authentication/register_controller.js";
import {log_in_controller} from "../../controller/authentication/log_in_controller.js";
import {authentication_module} from "../../dependency_injection/authentication_module.js";
import {MockRequest, MockResponse} from "./utils/mocks.js";
import {competitor_db} from "../../data_access/competitor/in_memory_data.js";
import {feed_db} from "./utils/utils.js";
import {
    competitor_fixture, competitor_form_fixture,
    competitor_invalid_fixture,
    competitor_invalid_fixture_2, competitor_invalid_fixture_3
} from "../fixtures/competitor.fixture.js";


describe('Authentication login/signup', () => {

    let register_controller;
    let auth_controller;

    beforeEach(() => {
        register_controller = register_competitor_controller(
            authentication_module.registration,
            authentication_module.authentication
        );
        auth_controller = log_in_controller(authentication_module.authentication);
        feed_db(competitor_db.competitors, [{...competitor_fixture}]);
    })

    it("Post on /api/competitors/register", async () => {
        const signup_body = {...competitor_form_fixture};
        const req = new MockRequest(signup_body);
        const res = new MockResponse();
        await register_controller(req, res);
        expect(res.body).toEqual({token: "jwt_token_rahff@gmail.com"})
        expect(res._status).toBe(200);
        expect(competitor_db.competitors).toContain({...competitor_form_fixture, verified: false})
    });

    it("cannot use a semantically invalid email", async () => {
        const signup_body = {...competitor_invalid_fixture};
        const req = new MockRequest(signup_body);
        const res = new MockResponse();
        await register_controller(req, res);
        expect(res.body).toEqual({message: "invalid email format"})
        expect(res._status).toBe(400);
    });

    it("its name cannot be a script", async () => {
        const signup_body = {...competitor_invalid_fixture_3};
        const req = new MockRequest(signup_body);
        const res = new MockResponse();
        await register_controller(req, res);
        expect(res.body).toEqual({message: "invalid name"})
        expect(res._status).toBe(400);
    });

    it("cannot use a weak password", async () => {
        const signup_body = {...competitor_invalid_fixture_2};
        const req = new MockRequest(signup_body);
        const res = new MockResponse();
        await register_controller(req, res);
        expect(res.body).toEqual({message: `
            password must have at least 
            one uppercase, one special 
            character and one digit`})
        expect(res._status).toBe(400);
    });

    it("Post on /api/competitors/log_in", async () => {
        const login_body = {email: "tintin@gmail.com", password: "Mot2$asse"};
        const req = new MockRequest(login_body);
        const res = new MockResponse();
        await auth_controller(req, res);
        expect(res.body).toEqual({token: "jwt_token_tintin@gmail.com"});
        expect(res._status).toBe(200);
    });

    it("Post on /api/competitors/log_in", async () => {
        const login_body = {email: "juju@gmail.com", password: "Mot2$asse"};
        const req = new MockRequest(login_body);
        const res = new MockResponse();
        await auth_controller(req, res);
        expect(res.body).toEqual({message: "invalid credentials"});
        expect(res._status).toBe(401);
    });
});