"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Term_1 = require("../entities/Term");
const TermRepo_1 = require("../repositories/TermRepo");
const typeorm_1 = require("typeorm");
const TermStudentRepo_1 = require("../repositories/TermStudentRepo");
const StudentRepo_1 = require("../repositories/StudentRepo");
class CurrentTerm {
    static get() {
        var currentTerm = this.currentTerm;
        if (!currentTerm) {
            const termRepo = typeorm_1.getCustomRepository(TermRepo_1.default);
            currentTerm = new Term_1.default();
            currentTerm.id = 182;
            currentTerm.termName = "HK 2 - NH 2018-2019";
            this.currentTerm = currentTerm;
            termRepo.save(currentTerm);
        }
        return currentTerm;
    }
}
exports.getTermScoresOfStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const termStudentRepo = typeorm_1.getCustomRepository(TermStudentRepo_1.default);
        const studentRepo = typeorm_1.getCustomRepository(StudentRepo_1.default);
        const { userId } = req.authentication;
        const student = yield studentRepo.getStudentByUserId(userId);
        const termStudents = yield termStudentRepo.getAllTermsOfStudent(student);
        return res.send(termStudents);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
exports.default = CurrentTerm;
//# sourceMappingURL=TermController.js.map