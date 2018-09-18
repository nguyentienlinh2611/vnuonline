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
const StudentRepo_1 = require("../repositories/StudentRepo");
const StudentCrawl_1 = require("../browser/StudentCrawl");
const TermRepo_1 = require("../repositories/TermRepo");
const SubjectRepo_1 = require("../repositories/SubjectRepo");
const ScoreRepo_1 = require("../repositories/ScoreRepo");
exports.signInStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const stdRepo = new StudentRepo_1.default();
    const termRepo = new TermRepo_1.default();
    const subRepo = new SubjectRepo_1.default();
    const scrRepo = new ScoreRepo_1.default();
    try {
        const stdCrawler = new StudentCrawl_1.default(req.body.studentId, req.body.password);
        yield stdCrawler.init();
        var stdDB = yield stdRepo.getStudent(req.body.studentId);
        var { student, terms, subjects, scores } = yield stdCrawler.getInfo();
        var termDB = yield termRepo.getAllTerms(student);
        if (stdDB === undefined) {
            stdRepo.saveStudent(student).then((result) => {
                res.send(student);
            });
        }
        else {
            res.send(stdDB);
        }
        if (termDB.length < terms.length) {
            for (var i = termDB.length; i < terms.length; i++) {
                yield termRepo.saveTerm(terms[i]);
            }
        }
    }
    catch (err) {
        return res.status(401).send("Sai tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại");
    }
});
//# sourceMappingURL=GetStudentInfo.js.map