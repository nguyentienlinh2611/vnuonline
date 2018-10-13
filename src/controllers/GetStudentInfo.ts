import { Request, Response } from "express";
import Student from "../entities/Student";
import StudentRepo from "../repositories/StudentRepo";
import StudentCrawler from "../browser/StudentCrawl";
import Term from "../entities/Term";
import TermRepo from "../repositories/TermRepo";
import Subject from "../entities/Subject";
import Score from "../entities/Score";
import SubjectRepo from "../repositories/SubjectRepo";
import ScoreRepo from "../repositories/ScoreRepo";

export const signInStudent = async (req: Request, res: Response) => {
    const stdRepo: StudentRepo = new StudentRepo();
    const termRepo: TermRepo = new TermRepo();
    const subRepo: SubjectRepo = new SubjectRepo();
    const scrRepo: ScoreRepo = new ScoreRepo();

    try {
        const stdCrawler: StudentCrawler = new StudentCrawler(req.body.studentId, req.body.password);
        await stdCrawler.init();

        var stdInfo = await stdRepo.getStudentById(req.body.studentId);

        if(stdInfo === undefined) {
            var {student, terms, subjects, scores} = await stdCrawler.getInfo();
            stdRepo.saveStudent(student);
            terms.forEach(term => {
                termRepo.saveTerm(term);
            });
            subjects.forEach(subject => {
                subRepo.saveSubject(subject);
            });
            scores.forEach(async score => {
                scrRepo.saveScore(score);
            });
        }

        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(401).send("Sai tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại");
    }
};