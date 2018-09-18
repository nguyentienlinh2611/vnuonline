import Term from "../entities/Term";
import { getManager } from "typeorm";
import Student from "../entities/Student";

class TermRepo {
    saveTerm(term:Term) {
        return getManager().getRepository(Term).save(term);
    }
    getTerm(termId: number) {
        return getManager().getRepository(Term).findOne(termId);
    }
    getAllTerms(student: Student) {
        return getManager().getRepository(Term).find({student: student});
    }
}

export default TermRepo;