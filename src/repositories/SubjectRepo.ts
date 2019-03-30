import Subject from "../entities/Subject";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Subject)
class SubjectRepo extends Repository<Subject>{
    async saveAll(subjectsList:Array<Subject>) {
        await subjectsList.forEach(async subject => {
            await this.save(subject);
        })
    }

    getAllSubjects() {
        return this.find();
    }

    getSubjectById(subjectId: number) {
        return this.findOne(subjectId);
    }
}

export default SubjectRepo;
