import {EntityRepository, Repository} from "typeorm";
import ClassSchedule from "../entities/ClassSchedule";
import Term from "../entities/Term";

@EntityRepository(ClassSchedule)
class ClassScheduleRepo extends Repository<ClassSchedule>{
    async saveAll(classScheduleList: ClassSchedule[]) {
        await classScheduleList.forEach(async (classSchedule) => {
            await this.save(classSchedule);
        });
    }

    async getScheduleOfClassSubjectInTerm(classId: string, termId: number) {
        const query = this.createQueryBuilder("schedule")
            .innerJoinAndSelect("schedule.classSubject","class", "class.id LIKE :classId")
            .innerJoinAndMapOne("schedule.term", Term, "term", "term.id = :termId")
            .setParameters({classId: `%${classId}%`,termId: termId});
        return query.getMany();
    }
}

export default ClassScheduleRepo;
