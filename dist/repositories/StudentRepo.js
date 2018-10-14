"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Student_1 = require("../entities/Student");
const typeorm_1 = require("typeorm");
class StudentRepo {
    saveStudent(student) {
        return typeorm_1.getManager().getRepository(Student_1.default).save(student);
    }
    getStudentById(studentId) {
        return typeorm_1.getManager().getRepository(Student_1.default).findOne({ displayId: studentId });
    }
}
exports.default = StudentRepo;
//# sourceMappingURL=StudentRepo.js.map