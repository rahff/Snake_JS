
import {fake_date_provider} from "../../services/date_time.js";
import {organize_competition_controller} from "../../controller/competition/organize_competition_controller.js";
import {competition_module} from "../../dependency_injection/competition_module.js";
import {MockRequest, MockResponse} from "./utils/mocks.js";
import {competition_db} from "../../data_access/competition/in_memory_data.js";
import {one_euro_prize} from "../../application/competition/model/Prize.js";


/*
type Competition = {
    id: string,
    name: string,
    period: {
        begin: Date,
        end: Date
    },
    img_miniature: string,
    game_id: number
}
*/

describe('competition http requests', () => {

    let organize_competition;

    beforeEach(() => {
        organize_competition = organize_competition_controller(competition_module.organization_service);
    })

    it("POST on /api/organize; A admin organize a new competition", async () => {
        const competition_body = {
            id: "competition_id_1",
            name: "The snake champions league",
            period: {
                begin: fake_date_provider.of(2024, 8, 10),
                end: fake_date_provider.of(2024, 8, 17),
            },
            img_miniature: "http://localhost:3000/public/images/snake_champions_league",
            game_id: 1
        }
        const req = new MockRequest(competition_body);
        const res = new MockResponse();
        await organize_competition(req, res);
        expect(res._status).toBe(200);
        expect(res.terminated).toBeTrue();
        expect(competition_db.competitions).toContain(competition_body);
        expect(competition_db.prizes).toContain(one_euro_prize("competition_id_1"));
    })
});