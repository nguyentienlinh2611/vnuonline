import Resource from "../entities/Resource";
import {getRepository, getCustomRepository} from "typeorm";
import * as moment from "moment";
import User from "../entities/User";
import {Base64ToImage} from "../utils/FileUtils";
import AttendanceRepo from "../repositories/AttendanceRepo";
import AttendanceResourceRepo from "../repositories/AttendanceResourceRepo";
import UserRepo from "../repositories/UserRepo";
import StudentRepo from "../repositories/StudentRepo";
import ClassScheduleRepo from "../repositories/ClassScheduleRepo";
import Student from "../entities/Student";
import Attendance from "../entities/Attendance";
import Teacher from "../entities/Teacher";
import TeacherRepo from "../repositories/TeacherRepo";
import ClassSchedule from "../entities/ClassSchedule";


export const takeRollCall = async (req,res) => {
    try {
        const teacherRepo: TeacherRepo = getCustomRepository(TeacherRepo);
        const stdRepo: StudentRepo = getCustomRepository(StudentRepo);
        const attendanceResourceRepo: AttendanceResourceRepo = getCustomRepository(AttendanceResourceRepo);
        const attendanceRepo: AttendanceRepo = getCustomRepository(AttendanceRepo);
        const classScheduleRepo: ClassScheduleRepo = getCustomRepository(ClassScheduleRepo);

        let result;
        const {csId} = req.body;
        const classSchedule:ClassSchedule = await classScheduleRepo.findOne(csId);
        const {userId} = req.authentication;
        const teacher:Teacher = await teacherRepo.getTeacherByUserId(userId);
        const {faces} = req.locals;
        let attendance: Attendance = new Attendance();
        await faces.forEach(async (face) => {
            const student: Student = await stdRepo.findOne({where:{userId: face.id}});
            result.push({student: student,img: face.img,confidence: face.confidence})
        });
        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const confirmAttendance = async (req,res) => {
    try {
        const {userId} = req.locals;
        const {img, studentId} = req.body;
        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};
