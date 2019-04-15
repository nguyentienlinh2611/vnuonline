import Term from "../entities/Term";
import TermRepo from "../repositories/TermRepo";
import {getCustomRepository} from "typeorm";
import TermStudentRepo from "../repositories/TermStudentRepo";
import Student from "../entities/Student";
import StudentRepo from "../repositories/StudentRepo";

class CurrentTerm {
    private static currentTerm;

    public static get():Term {
        var currentTerm = this.currentTerm;
        if(!currentTerm) {
            const termRepo: TermRepo = getCustomRepository(TermRepo);
            currentTerm = new Term();
            currentTerm.id = 182;
            currentTerm.termName = "HK 2 - NH 2018-2019";
            this.currentTerm = currentTerm;
            termRepo.save(currentTerm);
        }
        return currentTerm;
    }
}

export const getTermScoresOfStudent = async (req, res) => {
    try {
        const termStudentRepo: TermStudentRepo = getCustomRepository(TermStudentRepo);
        const studentRepo: StudentRepo = getCustomRepository(StudentRepo);

        const {userId} = req.authentication;

        const student:Student = await studentRepo.getStudentByUserId(userId);
        const termStudents = await termStudentRepo.getAllTermsOfStudent(student);

        return res.send(termStudents);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export default CurrentTerm;
