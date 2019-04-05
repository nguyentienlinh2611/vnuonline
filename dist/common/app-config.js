"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Student_1 = require("../entities/Student");
const Subject_1 = require("../entities/Subject");
const Score_1 = require("../entities/Score");
const Term_1 = require("../entities/Term");
const TermStudent_1 = require("../entities/TermStudent");
const Teacher_1 = require("../entities/Teacher");
const Attendance_1 = require("../entities/Attendance");
const AttendanceResource_1 = require("../entities/AttendanceResource");
const ClassSubject_1 = require("../entities/ClassSubject");
const ClassSchedule_1 = require("../entities/ClassSchedule");
const User_1 = require("../entities/User");
const Resource_1 = require("../entities/Resource");
exports.dbOptions = {
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: "root",
    password: "lts18737",
    database: "vnuonline",
    entities: [
        User_1.default,
        Teacher_1.default,
        Student_1.default,
        Subject_1.default,
        Score_1.default,
        Term_1.default,
        TermStudent_1.default,
        Attendance_1.default,
        Resource_1.default,
        AttendanceResource_1.default,
        ClassSubject_1.default,
        ClassSchedule_1.default
    ],
    synchronize: true,
    logging: false
};
//# sourceMappingURL=app-config.js.map