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
const TermStudentRepo_1 = require("../repositories/TermStudentRepo");
const UserActions_1 = require("./UserActions");
const ClassSubjectRepo_1 = require("../repositories/ClassSubjectRepo");
const ClassScheduleRepo_1 = require("../repositories/ClassScheduleRepo");
const User_1 = require("../entities/User");
const UserRepo_1 = require("../repositories/UserRepo");
const typeorm_1 = require("typeorm");
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const stdRepo: StudentRepo = new StudentRepo();
// const termRepo: TermRepo = new TermRepo();
// const termStudentRepo: TermStudentRepo = new TermStudentRepo();
// const subRepo: SubjectRepo = new SubjectRepo();
// const scrRepo: ScoreRepo = new ScoreRepo();
// const classSubjectRepo: ClassSubjectRepo = new ClassSubjectRepo();
// const classScheduleRepo: ClassScheduleRepo = new ClassScheduleRepo();
// const userRepo: UserRepo = new UserRepo();
// // const resourceRepo: ResourceRepo = getCustomRepository(ResourceRepo);
// const attendanceRepo: AttendanceRepo = new AttendanceRepo();
// const attendanceResourceRepo: AttendanceResourceRepo = new AttendanceResourceRepo();
exports.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userId = yield UserActions_1.checkAuthentication(req.body.username, req.body.password, req.body.type);
        return res.json({ token: jwt.sign({ userId: userId }, "VNUONLINE") });
    }
    catch (err) {
        switch (err.message) {
            case "USER_NOT_EXISTS":
                if (req.body.type === "STUDENT") {
                    try {
                        const userId = yield signInStudent(req.body.username, req.body.password);
                        return res.json({ token: jwt.sign({ userId: userId }, "VNUONLINE") });
                    }
                    catch (err) {
                        if (err.message === "PASSWORD_NOT_MATCH") {
                            return res.status(401).send("Sai tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại");
                        }
                    }
                }
                else if (req.body.type === "TEACHER") {
                    return res.status(401).send("Tài khoản không tồn tại! Vui lòng đăng ký tài khoản");
                }
            case "PASSWORD_NOT_MATCH":
                return res.status(401).send("Sai tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại");
            default:
                return res.status(500).send();
        }
    }
});
const signInStudent = (studentId, password) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userRepo = typeorm_1.getCustomRepository(UserRepo_1.default);
        const stdRepo = typeorm_1.getCustomRepository(StudentRepo_1.default);
        const termRepo = typeorm_1.getCustomRepository(TermRepo_1.default);
        const subRepo = typeorm_1.getCustomRepository(SubjectRepo_1.default);
        const termStudentRepo = typeorm_1.getCustomRepository(TermStudentRepo_1.default);
        const classSubjectRepo = typeorm_1.getCustomRepository(ClassSubjectRepo_1.default);
        const classScheduleRepo = typeorm_1.getCustomRepository(ClassScheduleRepo_1.default);
        const scrRepo = typeorm_1.getCustomRepository(ScoreRepo_1.default);
        const stdCrawler = new StudentCrawl_1.default(studentId, password);
        yield stdCrawler.init();
        let newUser = new User_1.default();
        newUser.hashPassword = bcrypt.hash(password, 10, function (err, hash) {
            if (!err) {
                newUser.hashPassword = hash;
                userRepo.save(newUser);
            }
        });
        let { student, terms, termStudents, subjects, scores } = yield stdCrawler.getInfo();
        student.user = newUser;
        yield stdRepo.save(student);
        yield termRepo.saveAll(terms);
        yield subRepo.saveAll(subjects);
        yield termStudentRepo.saveAll(termStudents);
        let { subjectsList, classSchedulesList, classSubjectsList } = yield stdCrawler.getScheduleInfo(student);
        yield subRepo.saveAll(subjectsList);
        yield classSubjectRepo.saveAll(classSubjectsList);
        yield classScheduleRepo.saveAll(classSchedulesList);
        yield scrRepo.saveAll(scores);
        return Promise.resolve(newUser.id);
    }
    catch (err) {
        console.log(err);
        throw new Error("PASSWORD_NOT_MATCH");
    }
});
exports.haiNao = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const classScheduleRepo = typeorm_1.getCustomRepository(ClassScheduleRepo_1.default);
        const classSubjectRepo = typeorm_1.getCustomRepository(ClassSubjectRepo_1.default);
        const { userId } = req.authentication;
        const thanksGod = yield classSubjectRepo.getAllSchedulesOfStudentInTerm(req.params.studentId, 182);
        const result = yield classScheduleRepo.getScheduleOfClassSubjectInTerm("MAT4080", 182);
        console.log(result);
        return res.send();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
//# sourceMappingURL=StudentHandle.js.map