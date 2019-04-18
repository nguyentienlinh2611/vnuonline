import {EntityRepository, Repository} from "typeorm";
import ClassSchedule from "../entities/ClassSchedule";
import Term from "../entities/Term";

@EntityRepository(ClassSchedule)
class ClassScheduleRepo extends Repository<ClassSchedule> {
    async saveAll(classScheduleList: ClassSchedule[]) {
        for(let i=0;i<classScheduleList.length;i++) {
            let classSchedule = classScheduleList[i];
            await this.createQueryBuilder("cs")
                .leftJoinAndSelect("cs.classSubject", "class")
                .where("class.id = :classSchedule", {classSchedule: classSchedule.classSubject.id})
                .getMany().then(async existSchedules => {
                let i = 0;
                const isExist = function () {
                    for (i; i < existSchedules.length; i++) {
                        let exSche = existSchedules[i];
                        if (exSche.periodFrom == classSchedule.periodFrom
                            && exSche.periodTo == classSchedule.periodTo
                            && exSche.dayOfWeek == classSchedule.dayOfWeek) {
                            return true;
                        }
                    }
                    return false;
                };
                if (!isExist()) {
                    await this.save(classSchedule);
                }
            });
        }
    }

    async getScheduleOfClassSubjectInTerm(classId: string, termId: number) {
        const query = this.createQueryBuilder("schedule")
            .innerJoinAndSelect("schedule.classSubject", "class", "class.id LIKE :classId")
            .innerJoinAndMapOne("schedule.term", Term, "term", "term.id = :termId")
            .setParameters({classId: `%${classId}%`, termId: termId});
        return query.getMany();
    }
}

export default ClassScheduleRepo;
