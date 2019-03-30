import Student from "../entities/Student";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Student)
class StudentRepo extends Repository<Student>{
    async getStudentByUserId(userId:string) {
        return this.findOne({where: {userId: userId}});
    }
}

export default StudentRepo;
