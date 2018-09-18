"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Score_1 = require("../entities/Score");
const typeorm_1 = require("typeorm");
class ScoreRepo {
    saveScore(score) {
        return typeorm_1.getManager().getRepository(Score_1.default).save(score);
    }
    getScore(studentId, subjectId) {
    }
    getAllScores(studentId) {
        return typeorm_1.getManager().getRepository(Score_1.default).findOne(studentId);
    }
}
exports.default = ScoreRepo;
//# sourceMappingURL=ScoreRepo.js.map