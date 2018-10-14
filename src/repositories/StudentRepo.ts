import Student from "../entities/Student";
import { getManager } from "typeorm";

class StudentRepo {
    saveStudent(student:Student) {
        return getManager().getRepository(Student).save(student);
    }

    getStudentById(studentId: number) {
        return getManager().getRepository(Student).findOne({displayId: studentId});
    }
}

export default StudentRepo;