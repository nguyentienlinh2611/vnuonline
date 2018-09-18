"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Term_1 = require("../entities/Term");
const typeorm_1 = require("typeorm");
class TermRepo {
    saveTerm(term) {
        return typeorm_1.getManager().getRepository(Term_1.default).save(term);
    }
    getTerm(termId) {
        return typeorm_1.getManager().getRepository(Term_1.default).findOne(termId);
    }
    getAllTerms(student) {
        return typeorm_1.getManager().getRepository(Term_1.default).find({ student: student });
    }
}
exports.default = TermRepo;
//# sourceMappingURL=TermRepo.js.map