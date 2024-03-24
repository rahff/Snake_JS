import {office_prize_registration_service} from "../../application/competition/office_prize_registration_service.js";
import {in_memory_save_prize} from "../../data_access/competition/prize_data_access.js";

describe('Prize office', () => {
    let create_competition_prize;
    let save_prize;
    let db;
    beforeEach(() => {
        db = [];
        save_prize = in_memory_save_prize(db);
        create_competition_prize = office_prize_registration_service(save_prize);
    })

    it("create a 1 € prize for the created competition", async () => {
        const competition_created_event = {competition_id: "competition_id"};
        const result = await create_competition_prize(competition_created_event);
        expect(result.is_ok).toBeTrue();
        expect(db).toContain({competition_id: "competition_id", estimated_amount: 1});
    })
});