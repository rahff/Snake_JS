import {
    log_in_controller,
    register_competitor_controller
} from "../../controller/authentication/authentication_controllers.js";
import {authentication_module} from "../../dependency_injection/authentication_module.js";
import {MockRequest, MockResponse} from "./utils/mocks.js";
import {competitor_db} from "../../data_access/competitor/in_memory_data.js";


describe('Authentication login/signup', () => {

    let register_controller;
    let auth_controller;

    beforeEach(() => {
        register_controller = register_competitor_controller(authentication_module.registration, authentication_module.authentication);
        auth_controller = log_in_controller(authentication_module.authentication);
        competitor_db.competitors[0] = {
            name: "Tintin",
            email: "tintin@gmail.com",
            password: "Mot2$asse",
            id: "456"
        };
    })

    it("Post on /api/competitors/register", async () => {
        const signup_body = {name: "Rahff", email: "rahff@gmail.com", password: "12345"};
        const req = new MockRequest(signup_body);
        const res = new MockResponse();
        await register_controller(req, res);
        expect(res.body).toEqual({token: "jwt_token_rahff@gmail.com"})
        expect(res._status).toBe(200);
    });

    it("Post on /api/competitors/log_in", async () => {
        const login_body = {email: "tintin@gmail.com", password: "Mot2$asse"};
        const req = new MockRequest(login_body);
        const res = new MockResponse();
        await auth_controller(req, res);
        expect(res.body).toEqual({token: "jwt_token_tintin@gmail.com"});
        expect(res._status).toBe(200);
    });

});