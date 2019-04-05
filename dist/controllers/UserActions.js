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
const typeorm_1 = require("typeorm");
const Student_1 = require("../entities/Student");
const Teacher_1 = require("../entities/Teacher");
const bcrypt = require('bcrypt');
function checkAuthentication(username, password, type) {
    return __awaiter(this, void 0, void 0, function* () {
        let hashPassword;
        let userId;
        if (type === "STUDENT") {
            let student = yield typeorm_1.getRepository(Student_1.default)
                .createQueryBuilder("student")
                .innerJoinAndSelect("student.user", "user")
                .where("student.displayId = :studentId", { studentId: username })
                .getOne();
            if (student) {
                userId = student.user.id;
                hashPassword = student.user.hashPassword;
            }
            else {
                throw new Error("USER_NOT_EXISTS");
            }
        }
        else if (type === "TEACHER") {
            let teacher = yield typeorm_1.getRepository(Teacher_1.default)
                .createQueryBuilder("teacher")
                .innerJoinAndSelect("teacher.id", "user")
                .where("teacher.email = :email", { email: username })
                .getOne();
            if (teacher) {
                userId = teacher.id;
                hashPassword = teacher.id.hashPassword;
            }
            else {
                throw new Error("USER_NOT_EXISTS");
            }
        }
        var res = bcrypt.compareSync(password, hashPassword);
        if (res) {
            return Promise.resolve(userId);
        }
        else {
            throw new Error("PASSWORD_NOT_MATCH");
        }
    });
}
exports.checkAuthentication = checkAuthentication;
//# sourceMappingURL=UserActions.js.map