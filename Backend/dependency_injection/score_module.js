import {score_recording, state_snapshot_recording} from "../application/score/score_recording.js";
import {
    in_memory_get_snapshot,
    in_memory_save_score,
    in_memory_save_snapshot
} from "../data_access/score/score_data_access.js";
import {score_db} from "../data_access/score/in_memory_data.js";
import {score_validation} from "../application/score/score_validation_service.js";

export const score_module = {
    registration_service: score_recording(in_memory_save_score(score_db.scores)),
    validation_service: score_validation(in_memory_get_snapshot(score_db.snapshots)),
    snapshot_recording_service: state_snapshot_recording(in_memory_save_snapshot(score_db.snapshots))
}