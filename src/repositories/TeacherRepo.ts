import Teacher from "../entities/Teacher";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Teacher)
class TeacherRepo extends Repository<Teacher> {
    async getTeacherByUserId(userId: string) {
        return this.findOne(userId);
    }
}

export default TeacherRepo;
