import "reflect-metadata";
import {ConnectionOptions} from "typeorm";
import Student from "../entities/Student";
import Subject from "../entities/Subject";
import Score from "../entities/Score";
import Term from "../entities/Term";
import TermStudent from "../entities/TermStudent";
import Teacher from "../entities/Teacher";
import Attendance from "../entities/Attendance";
import AttendanceResource from "../entities/AttendanceResource";
import ClassSubject from "../entities/ClassSubject";
import ClassSchedule from "../entities/ClassSchedule";
import User from "../entities/User";
import Resource from "../entities/Resource";

export let dbOptions: ConnectionOptions = {
    type: "mysql",
    host: 'vnuonline_database',
    port: 3306,
    username: "root",
    password: "lts18737",
    database: "vnuonline",
    entities: [
        User,
        Teacher,
        Student,
        Subject,
        Score,
        Term,
        TermStudent,
        Attendance,
        Resource,
        AttendanceResource,
        ClassSubject,
        ClassSchedule
    ],
    synchronize: true,
    logging: false
};
