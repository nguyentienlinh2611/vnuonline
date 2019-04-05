"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TeacherRepo_1 = require("../repositories/TeacherRepo");
const typeorm_1 = require("typeorm");
const Teacher_1 = require("../entities/Teacher");
function teacherRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacherRepo = typeorm_1.getCustomRepository(TeacherRepo_1.default);
            const { userId } = req.locals;
            const { fullName, gender, email, phone, faculty } = req.body;
            let teacher = new Teacher_1.default();
            teacher.fullName = fullName;
            teacher.gender = gender;
            teacher.email = email;
            teacher.phone = phone;
            teacher.faculty = faculty;
            teacher.id = userId;
            teacher = yield teacherRepo.save(teacher);
            return res.send(teacher);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.teacherRegister = teacherRegister;
//# sourceMappingURL=TeacherController.js.map