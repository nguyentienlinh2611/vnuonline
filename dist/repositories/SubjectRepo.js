"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("../entities/Subject");
const typeorm_1 = require("typeorm");
class SubjectRepo {
    saveSubject(subject) {
        return typeorm_1.getManager().getRepository(Subject_1.default).save(subject);
    }
    getSubject(subjectId) {
        return typeorm_1.getManager().getRepository(Subject_1.default).findOne(subjectId);
    }
}
exports.default = SubjectRepo;
//# sourceMappingURL=SubjectRepo.js.map