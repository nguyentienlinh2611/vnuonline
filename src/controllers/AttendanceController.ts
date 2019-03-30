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

const uuidv4 = require('uuid/v4');

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            }).catch(err => {
                return Promise.reject(err);
            })
        ).catch(err => {
            return Promise.reject(err);
        });
};


export const uploadImage = async (req, res) => {
    try {
        const {userId} = req.authentication;
        const {base64, type, description} = req.body;
        const uuid = uuidv4();

        const filePath: string = await Base64ToImage(`data/training_images/${userId}`, `${uuid}.jpg`, base64);
        let resource = new Resource();
        resource.owner = await getRepository(User).findOne(userId);
        resource.createdTime = new Date();
        resource.type = type;
        if (description) resource.description = description;
        resource.source = filePath;
        getRepository(Resource).save(resource);

        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const recognizePerson = async (req, res, next) => {
    try {
        const userRepo:UserRepo = getCustomRepository(UserRepo);
        const {files} = req;
        console.log(files);

        // const response = await request({
        //     url: 'http://vnuonline_openface:5000/recognize',
        //     method: 'POST',
        //     body: JSON.stringify(body)
        // });
        // let users;
        // const {faces} = response;
        // await faces.forEach(async face => {
        //     const user: User = await userRepo.findOne(face.user);
        //     users.push({id: user, img: face.img, confidence:face.confidence});
        // });
        // console.log(users);
        // req.locals.faces = users;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

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
