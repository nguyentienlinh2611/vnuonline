import {Request, Response} from "express";
import ClassScheduleRepo from "../repositories/ClassScheduleRepo";
import {getCustomRepository} from "typeorm";
import ClassSubjectRepo from "../repositories/ClassSubjectRepo";
import ClassSubject from "../entities/ClassSubject";
import ClassSchedule from "../entities/ClassSchedule";
import CurrentTerm from "./TermController";
import StudentRepo from "../repositories/StudentRepo";
import Student from "../entities/Student";


export async function getSchedulesOfStudentInTerm(req, res) {
    try {
        const classSubjectRepo: ClassSubjectRepo = getCustomRepository(ClassSubjectRepo);
        const studentRepo: StudentRepo = getCustomRepository(StudentRepo);

        const {userId} = req.authentication;
        const {termId} = req.params;

        const student:Student = await studentRepo.getStudentByUserId(userId);

        const result: Array<ClassSubject> = await classSubjectRepo.getAllSchedulesOfStudentInTerm(student.id, termId);

        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export async function getCurrentSchedulesOfStudent(req, res) {
    try {
        const classSubjectRepo: ClassSubjectRepo = getCustomRepository(ClassSubjectRepo);
        const studentRepo: StudentRepo = getCustomRepository(StudentRepo);

        const {userId} = req.authentication;

        let student:Student = await studentRepo.getStudentByUserId(userId);

        let result: Array<ClassSubject> = await classSubjectRepo.getAllSchedulesOfStudentInTerm(student.id, CurrentTerm.get().id);

        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export async function getSchedulesOfClassInTerm(req:Request, res:Response) {
    try {
        const classScheduleRepo: ClassScheduleRepo = getCustomRepository(ClassScheduleRepo);

        const {classId, termId} = req.body;
        const result: Array<ClassSchedule> = await classScheduleRepo.getScheduleOfClassSubjectInTerm(classId, termId);

        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export async function getCurrentSchedulesOfClass(req:Request, res:Response) {
    try {
        const classScheduleRepo: ClassScheduleRepo = getCustomRepository(ClassScheduleRepo);

        const {classId, termId} = req.params;
        const result: Array<ClassSchedule> = await classScheduleRepo.getScheduleOfClassSubjectInTerm(classId, CurrentTerm.get().id);

        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}
