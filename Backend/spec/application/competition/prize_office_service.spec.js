import {
    increment_competition_prize,
    create_competition_prize
} from "../../../application/competition/prize_registration_service.js";
import {in_memory_get_prize, in_memory_save_prize} from "../../../data_access/competition/prize_data_access.js";



describe('Prize office', () => {
    let _create_competition_prize;
    let _increment_competition_prize;
    let save_prize;
    let get_prize;
    let db;

    const create_prize = async () => {
        const competition_created_event = {id: "competition_id"};
        return await _create_competition_prize(competition_created_event);
    }

    beforeEach(() => {
        db = [];
        save_prize = in_memory_save_prize(db);
        get_prize = in_memory_get_prize(db);
        _create_competition_prize = create_competition_prize(save_prize);
        _increment_competition_prize = increment_competition_prize(save_prize, get_prize);
    });

    it("create a 1 € prize for the created competition", async () => {
        const result = await create_prize();
        expect(result.is_ok).toBeTrue();
        expect(db).toContain({competition_id: "competition_id", estimated_amount: 1});
    });

    it("increase the prize amount for each competitor participation", async () => {
        await create_prize();
        const competitor_participated_event = {competition_id: "competition_id"};
        const result = await _increment_competition_prize(competitor_participated_event);
        expect(result.is_ok).toBeTrue();
        expect(db).toContain({competition_id: "competition_id", estimated_amount: 2});
    });
});