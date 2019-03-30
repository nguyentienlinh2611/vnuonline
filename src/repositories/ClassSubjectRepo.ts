import {EntityRepository, Repository} from "typeorm";
import ClassSubject from "../entities/ClassSubject";

@EntityRepository(ClassSubject)
class ClassSubjectRepo extends Repository<ClassSubject>{
    async saveAll(classSubjectList: ClassSubject[]) {
        await classSubjectList.forEach(async (classSubject) => {
            await this.save(classSubject);
        });
    }

    async getAllSchedulesOfStudentInTerm(studentId: number, termId: number) {
        const query =  this.createQueryBuilder("class")
            .innerJoinAndSelect("class.students", "student")
            .innerJoinAndSelect("class.subject","subject")
            .innerJoinAndSelect("class.term","term")
            .innerJoinAndSelect("class.classSchedules","schedule")
            .where("student.id = :studentId AND term.id = :termId", {studentId, termId});
        return query.getMany();
    }

    async getSchedulesOfSubjectInTerm(subjectId: string, termId: number) {
        const query = this.createQueryBuilder("class")
            .innerJoinAndSelect("class.subject","subject")
            .innerJoinAndSelect("class.term","term")
            .where("subject.id = :subjectId AND term.id = :termId", {subjectId, termId});
        return query.getMany();
    }
}

export default ClassSubjectRepo;
