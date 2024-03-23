import {office_game_availability_service} from "../../application/admin/office_game_availability_service.js";
import {in_memory_save_game} from "../../data_access/game/game_data_access.js";

describe('Games office', () => {
    let make_game_available;
    let save_game;
    let db_game;
    beforeEach(() => {
        db_game = [];
        save_game = in_memory_save_game(db_game)
        make_game_available = office_game_availability_service(save_game);
    })

    it("Admin makes a new game available for competition", async () => {
        const validated_form_data = {
            name: "The Snake",
            img_miniature: "http://s3_bucket/The_Snake.png",
            id: 1
        };
        const result = await make_game_available(validated_form_data);
        expect(result.is_ok).toBeTrue();
        expect(db_game).toContain(validated_form_data);
    })
});