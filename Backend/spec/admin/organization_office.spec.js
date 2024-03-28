import {fake_date_provider} from "../../services/date_time.js";
import {in_memory_save_competition} from "../../data_access/competition/organization_data_access.js";
import {organize_competition} from "../../application/competition/organization_service.js";




describe('Organization office', () => {
    let _organize_competition;
    let create_competition;
    let competition_db;

    beforeEach(() => {
        competition_db = [];
        create_competition = in_memory_save_competition(competition_db);
        _organize_competition = organize_competition(create_competition, fake_date_provider);
    });

    it("A game organizes a new competition", async () => {
        const validated_form_data = {
            id: "competition_id",
            name: "The snake game",
            period: {
                begin: fake_date_provider.of(2024, 2, 29),
                end: fake_date_provider.of(2024, 3, 5)
            },
            img_miniature: "http://s3_bucket/competition_id/The snake game.png",
            game_id: 1
        }
        const result = await _organize_competition(validated_form_data);
        expect(result.is_ok).toBeTrue();
        expect(result.data).toEqual({id: "competition_id"});
        expect(competition_db).toContain(validated_form_data);
    });

    it("cannot begin in past", async () => {
        const validated_form_data = {
            id: "competition_id",
            name: "The snake game",
            period: {
                begin: fake_date_provider.date_in_past(),
                end: fake_date_provider.of(2024, 3, 5)
            }
        };
        const result = await _organize_competition(validated_form_data);
        expect(result.is_ok).toBeFalse();
        expect(competition_db).not.toContain(validated_form_data)
    });

    it("cannot ends before begin", async () => {
        const validated_form_data = {
            id: "competition_id",
            name: "The snake game",
            period: {
                begin: fake_date_provider.now(),
                end: fake_date_provider.date_in_past()
            }
        };
        const result = await _organize_competition(validated_form_data);
        expect(result.is_ok).toBeFalse();
        expect(competition_db).not.toContain(validated_form_data)
    });
});