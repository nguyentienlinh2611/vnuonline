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
const ClassScheduleRepo_1 = require("../repositories/ClassScheduleRepo");
const typeorm_1 = require("typeorm");
const ClassSubjectRepo_1 = require("../repositories/ClassSubjectRepo");
const TermController_1 = require("./TermController");
const StudentRepo_1 = require("../repositories/StudentRepo");
function getSchedulesOfStudentInTerm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const classSubjectRepo = typeorm_1.getCustomRepository(ClassSubjectRepo_1.default);
            const studentRepo = typeorm_1.getCustomRepository(StudentRepo_1.default);
            const { userId } = req.authentication;
            const { termId } = req.params;
            const student = yield studentRepo.getStudentByUserId(userId);
            const result = yield classSubjectRepo.getAllSchedulesOfStudentInTerm(student.id, termId);
            return res.send(result);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.getSchedulesOfStudentInTerm = getSchedulesOfStudentInTerm;
function getCurrentSchedulesOfStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const classSubjectRepo = typeorm_1.getCustomRepository(ClassSubjectRepo_1.default);
            const studentRepo = typeorm_1.getCustomRepository(StudentRepo_1.default);
            const { userId } = req.authentication;
            let student = yield studentRepo.getStudentByUserId(userId);
            let result = yield classSubjectRepo.getAllSchedulesOfStudentInTerm(student.id, TermController_1.default.get().id);
            return res.send(result);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.getCurrentSchedulesOfStudent = getCurrentSchedulesOfStudent;
function getSchedulesOfClassInTerm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const classScheduleRepo = typeorm_1.getCustomRepository(ClassScheduleRepo_1.default);
            const { classId, termId } = req.body;
            const result = yield classScheduleRepo.getScheduleOfClassSubjectInTerm(classId, termId);
            return res.send(result);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.getSchedulesOfClassInTerm = getSchedulesOfClassInTerm;
function getCurrentSchedulesOfClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const classScheduleRepo = typeorm_1.getCustomRepository(ClassScheduleRepo_1.default);
            const { classId, termId } = req.params;
            const result = yield classScheduleRepo.getScheduleOfClassSubjectInTerm(classId, TermController_1.default.get().id);
            return res.send(result);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.getCurrentSchedulesOfClass = getCurrentSchedulesOfClass;
//# sourceMappingURL=ClassScheduleController.js.map