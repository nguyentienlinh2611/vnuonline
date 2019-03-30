import {EntityRepository, Repository} from "typeorm";
import AttendanceResource from "../entities/AttendanceResource";

@EntityRepository(AttendanceResource)
class AttendanceResourceRepo extends Repository<AttendanceResource> {
    async saveAll(resources: Array<AttendanceResource>) {
        await resources.forEach(async resource => {
            await this.save(resource);
        })
    }

    findByAttendance(attendanceId: number) {
        return this.find({
            where: {
                attendanceId: attendanceId
            }
        });
    }
}

export default AttendanceResourceRepo;
