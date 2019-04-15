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
const typeorm_1 = require("typeorm");
const AttendanceRepo_1 = require("../repositories/AttendanceRepo");
const AttendanceResourceRepo_1 = require("../repositories/AttendanceResourceRepo");
const StudentRepo_1 = require("../repositories/StudentRepo");
const ClassScheduleRepo_1 = require("../repositories/ClassScheduleRepo");
const Attendance_1 = require("../entities/Attendance");
const TeacherRepo_1 = require("../repositories/TeacherRepo");
exports.takeRollCall = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const teacherRepo = typeorm_1.getCustomRepository(TeacherRepo_1.default);
        const stdRepo = typeorm_1.getCustomRepository(StudentRepo_1.default);
        const attendanceResourceRepo = typeorm_1.getCustomRepository(AttendanceResourceRepo_1.default);
        const attendanceRepo = typeorm_1.getCustomRepository(AttendanceRepo_1.default);
        const classScheduleRepo = typeorm_1.getCustomRepository(ClassScheduleRepo_1.default);
        let result;
        const { csId } = req.body;
        const classSchedule = yield classScheduleRepo.findOne(csId);
        const { userId } = req.authentication;
        const teacher = yield teacherRepo.getTeacherByUserId(userId);
        const { faces } = req.locals;
        let attendance = new Attendance_1.default();
        yield faces.forEach((face) => __awaiter(this, void 0, void 0, function* () {
            const student = yield stdRepo.findOne({ where: { userId: face.id } });
            result.push({ student: student, img: face.img, confidence: face.confidence });
        }));
        return res.send(result);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
exports.confirmAttendance = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { userId } = req.locals;
        const { img, studentId } = req.body;
        return res.send();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
//# sourceMappingURL=AttendanceController.js.map