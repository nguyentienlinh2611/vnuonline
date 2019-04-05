import {Request, Response} from "express";
import StudentRepo from "../repositories/StudentRepo";
import StudentCrawler from "../browser/StudentCrawl";
import TermRepo from "../repositories/TermRepo";
import SubjectRepo from "../repositories/SubjectRepo";
import ScoreRepo from "../repositories/ScoreRepo";
import TermStudentRepo from "../repositories/TermStudentRepo";
import {checkAuthentication} from "./UserController";
import ClassSubjectRepo from "../repositories/ClassSubjectRepo";
import ClassScheduleRepo from "../repositories/ClassScheduleRepo";
import User from "../entities/User";
import UserRepo from "../repositories/UserRepo";
import {getCustomRepository} from "typeorm";
import {log} from "util";

const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export async function signIn(req: Request, res: Response) {
    try {
        const userId = await checkAuthentication(req.body.username, req.body.password, req.body.type);
        return res.json({token: jwt.sign({userId: userId}, "VNUONLINE")});
    } catch (err) {
        switch (err.message) {
            case "USER_NOT_EXISTS":
                if (req.body.type === "STUDENT") {
                    try {
                        const userId = await signInStudent(req.body.username, req.body.password);
                        return res.json({token: jwt.sign({userId: userId}, "VNUONLINE")});
                    } catch (err) {
                        if (err.message === "PASSWORD_NOT_MATCH") {
                            return res.status(401).send({error: "Sai tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại"});
                        }
                    }
                } else if (req.body.type === "TEACHER") {
                    return res.status(401).send({error: "Tài khoản không tồn tại! Vui lòng đăng ký tài khoản"});
                }
            case "PASSWORD_NOT_MATCH":
                return res.status(401).send({error: "Sai tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại"});
            default:
                return res.status(500).send({error: "Internal Server Error"});
        }
    }
}

async function signInStudent(studentId, password){
    try {
        const userRepo: UserRepo = getCustomRepository(UserRepo);
        const stdRepo: StudentRepo = getCustomRepository(StudentRepo);
        const termRepo: TermRepo = getCustomRepository(TermRepo);
        const subRepo: SubjectRepo = getCustomRepository(SubjectRepo);
        const termStudentRepo: TermStudentRepo = getCustomRepository(TermStudentRepo);
        const classSubjectRepo: ClassSubjectRepo = getCustomRepository(ClassSubjectRepo);
        const classScheduleRepo: ClassScheduleRepo = getCustomRepository(ClassScheduleRepo);
        const scrRepo: ScoreRepo = getCustomRepository(ScoreRepo);

        const stdCrawler: StudentCrawler = new StudentCrawler(studentId, password);
        await stdCrawler.init();

        let newUser = new User();
        newUser.hashPassword = bcrypt.hash(password, 10, function (err, hash) {
            if (!err) {
                newUser.hashPassword = hash;
                userRepo.save(newUser);
            }
        });

        let {student, terms, termStudents, subjects, scores} = await stdCrawler.getInfo();
        student.user = newUser;
        await stdRepo.save(student);
        await termRepo.saveAll(terms);
        await subRepo.saveAll(subjects);
        await termStudentRepo.saveAll(termStudents);

        let {subjectsList, classSchedulesList, classSubjectsList} = await stdCrawler.getScheduleInfo(student);
        await subRepo.saveAll(subjectsList);
        await classSubjectRepo.saveAll(classSubjectsList);
        await classScheduleRepo.saveAll(classSchedulesList);
        await scrRepo.saveAll(scores);
        return Promise.resolve(newUser.id);
    } catch (err) {
        console.log(err);
        throw new Error("PASSWORD_NOT_MATCH");
    }
};
