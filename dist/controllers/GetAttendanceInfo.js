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
const Resource_1 = require("../entities/Resource");
const typeorm_1 = require("typeorm");
const moment = require("moment");
const User_1 = require("../entities/User");
const FileUtils_1 = require("../utils/FileUtils");
const AttendanceRepo_1 = require("../repositories/AttendanceRepo");
const AttendanceResourceRepo_1 = require("../repositories/AttendanceResourceRepo");
const UserRepo_1 = require("../repositories/UserRepo");
const StudentRepo_1 = require("../repositories/StudentRepo");
const ClassScheduleRepo_1 = require("../repositories/ClassScheduleRepo");
const Attendance_1 = require("../entities/Attendance");
const TeacherRepo_1 = require("../repositories/TeacherRepo");
const uuidv4 = require('uuid/v4');
exports.request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
        .then(response => response.json().then(json => {
        if (!response.ok) {
            return Promise.reject(json);
        }
        return json;
    }).catch(err => {
        return Promise.reject(err);
    })).catch(err => {
        return Promise.reject(err);
    });
};
exports.uploadImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { userId } = req.authentication;
        const { base64, type, description } = req.body;
        const uuid = uuidv4();
        const filePath = yield FileUtils_1.Base64ToImage(`data/training_images/${userId}`, `${uuid}.jpg`, base64);
        let resource = new Resource_1.default();
        resource.owner = yield typeorm_1.getRepository(User_1.default).findOne(userId);
        resource.createdTime = new Date();
        resource.type = type;
        if (description)
            resource.description = description;
        resource.source = filePath;
        typeorm_1.getRepository(Resource_1.default).save(resource);
        return res.send();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
exports.recognizePerson = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userRepo = typeorm_1.getCustomRepository(UserRepo_1.default);
        const { base64 } = req.body;
        const body = {
            base64: base64
        };
        const response = yield exports.request({
            url: 'http://vnuonline_openface:5000/recognize',
            method: 'POST',
            body: JSON.stringify(body)
        });
        let users = new Array();
        const { faces } = response;
        yield faces.forEach((face) => __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepo.findOne(face.user);
            users.push(user);
        }));
        req.locals.users = users;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
exports.takeRollCall = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const teacherRepo = typeorm_1.getCustomRepository(TeacherRepo_1.default);
        const stdRepo = typeorm_1.getCustomRepository(StudentRepo_1.default);
        const attendanceResourceRepo = typeorm_1.getCustomRepository(AttendanceResourceRepo_1.default);
        const attendanceRepo = typeorm_1.getCustomRepository(AttendanceRepo_1.default);
        const classScheduleRepo = typeorm_1.getCustomRepository(ClassScheduleRepo_1.default);
        const { csId } = req.body;
        const classSchedule = yield classScheduleRepo.findOne(csId);
        const { userId } = req.authentication;
        const teacher = yield teacherRepo.getTeacherByUserId(userId);
        const { users } = req.locals;
        let attendance = new Attendance_1.default();
        let students = new Array();
        yield users.forEach((user) => __awaiter(this, void 0, void 0, function* () {
            const student = yield stdRepo.findOne({ user: user });
            students.push(student);
        }));
        attendance.students = students;
        attendance.teacher = teacher;
        attendance.createdTime = new Date();
        attendance.weekTime = moment().week();
        attendance.classSchedule = classSchedule;
        attendanceRepo.save(attendance);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
//# sourceMappingURL=GetAttendanceInfo.js.map