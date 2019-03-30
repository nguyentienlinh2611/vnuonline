import Term from "../entities/Term";
import {EntityRepository, Repository} from "typeorm";
import Student from "../entities/Student";
import TermStudent from "../entities/TermStudent";

@EntityRepository(TermStudent)
class TermStudentRepo extends Repository<TermStudent>{
    async saveAll(termStudentsList: Array<TermStudent>) {
        await termStudentsList.forEach(async termStudent => {
            await this.save(termStudent);
        });
    }

    getAllTermsByTerm(term: Term) {
        return this.find({ term: term });
    }

    getTermById(id: number) {
        return this.findOne({id: id});
    }

    getAllTermsOfStudent(student: Student) {
        return this.createQueryBuilder("term_student").leftJoinAndSelect("term_student.term","term").getMany();
    }

    getTermByTermAndStudent(student: Student, term: Term) {
        return this.findOne({student, term});
    }
}

export default TermStudentRepo;
