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

        var stdDB: Student = await stdRepo.getStudent(req.body.studentId);

        var { student, terms, subjects, scores } = await stdCrawler.getInfo();

        var termDB: Array<Term> = await termRepo.getAllTerms(student);

        if (stdDB === undefined) {
            stdRepo.saveStudent(student).then((result) => {
                res.send(student);
            });
        } else {
            res.send(stdDB);
        }

        if (termDB.length < terms.length) {
            for (var i = termDB.length; i < terms.length; i++) {
                await termRepo.saveTerm(terms[i]);
            }
        }
    } catch (err) {
        return res.status(401).send("Sai tài khoản hoặc mật khẩu! Vui lòng kiểm tra lại");
    }
};