import Term from "../entities/Term";
import { getRepository } from "typeorm";
import Student from "../entities/Student";

class TermRepo {
    saveTerm(term:Term) {
        return getRepository(Term).save(term);
    }

    getAllTermsByTermId(termId: number) {
        return getRepository(Term).find({ termId: termId });
    }

    getTermByAIID(aiid: number) {
        return getRepository(Term).findOne({aiid: aiid});
    }

    getAllTermsOfStudent(student: Student) {
        return getRepository(Term).find({student: student});
    }

    getTermByTermIdAndStudentId(student: Student, termId: number) {
        return getRepository(Term).findOne({student, termId});
    }
}

export default TermRepo;