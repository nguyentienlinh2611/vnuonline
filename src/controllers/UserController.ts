import {createConnection, getConnection, getCustomRepository, getRepository, Repository} from "typeorm";
import Student from "../entities/Student";
import Teacher from "../entities/Teacher";
import User from "../entities/User";
import UserRepo from "../repositories/UserRepo";
import {dbOptions} from "../common/app-config";

const bcrypt = require('bcrypt');

export async function userRegister(req, res, next) {
    try {
        const userRepo: UserRepo = getCustomRepository(UserRepo);

        const {password} = req.body;
        let newUser = new User();
        newUser.hashPassword = await bcrypt.hashSync(password, 10);
        const user = await userRepo.save(newUser);
        req.locals.userId = user.id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export async function checkAuthentication(username, password, type) {
    let hashPassword;
    let userId;
    if (type === "STUDENT") {
        let studentRepo: Repository<Student> = getRepository(Student);
        const student: Student = await studentRepo.createQueryBuilder("student")
            .innerJoinAndSelect("student.user", "user")
            .where("student.displayId = :studentId", {studentId: username})
            .getOne();
        if (student) {
            userId = student.user.id;
            hashPassword = student.user.hashPassword;
        } else {
            throw new Error("USER_NOT_EXISTS")
        }
    } else if (type === "TEACHER") {
        let teacher: Teacher = await getRepository(Teacher)
            .createQueryBuilder("teacher")
            .innerJoinAndSelect("teacher.id", "user")
            .where("teacher.email = :email", {email: username})
            .getOne();
        if (teacher) {
            userId = teacher.id;
            hashPassword = teacher.id.hashPassword;
        } else {
            throw new Error("USER_NOT_EXISTS");
        }
    }
    var res = bcrypt.compareSync(password, hashPassword);
    if (res) {
        return Promise.resolve(userId);
    } else {
        throw new Error("PASSWORD_NOT_MATCH");
    }
}
