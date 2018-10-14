"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Term_1 = require("../entities/Term");
const typeorm_1 = require("typeorm");
class TermRepo {
    saveTerm(term) {
        return typeorm_1.getRepository(Term_1.default).save(term);
    }
    getAllTermsByTermId(termId) {
        return typeorm_1.getRepository(Term_1.default).find({ termId: termId });
    }
    getTermByAIID(aiid) {
        return typeorm_1.getRepository(Term_1.default).findOne({ aiid: aiid });
    }
    getAllTermsOfStudent(student) {
        return typeorm_1.getRepository(Term_1.default).find({ student: student });
    }
    getTermByTermIdAndStudentId(student, termId) {
        return typeorm_1.getRepository(Term_1.default).findOne({ student, termId });
    }
}
exports.default = TermRepo;
//# sourceMappingURL=TermRepo.js.map