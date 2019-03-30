import {EntityRepository, Repository} from "typeorm";
import Attendance from "../entities/Attendance";

@EntityRepository(Attendance)
class AttendanceRepo extends Repository<Attendance>{
    async saveAll(attendances: Array<Attendance>) {
        await attendances.forEach(async attendance => {
            await this.save(attendance);
        });
    }

    findByTeacherAndScheduleInWeek(teacherId:string, scheduleId: number, weekTime: number) {
        return this.findOne({
            where: {
                teacherId: teacherId,
                classScheduleId: scheduleId,
                weekTime: weekTime
            }
        });
    }
}

export default AttendanceRepo;
