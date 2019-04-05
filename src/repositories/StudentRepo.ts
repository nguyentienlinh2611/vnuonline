import Student from "../entities/Student";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Student)
class StudentRepo extends Repository<Student>{
    async getStudentByUserId(userId:string) {
        let student = await this.createQueryBuilder("student")
            .leftJoin("student.user","user")
            .where("user.id = :userId",{userId: userId})
            .getOne();
        return student;
    }
}

export default StudentRepo;
