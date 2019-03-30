import {getCustomRepository, getRepository} from "typeorm";
import Student from "../entities/Student";
import Teacher from "../entities/Teacher";
import User from "../entities/User";
import UserRepo from "../repositories/UserRepo";
import StudentRepo from "../repositories/StudentRepo";

const bcrypt = require('bcrypt');


const uuidv4 = require('uuid/v4');

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            }).catch(err => {
                return Promise.reject(err);
            })
        ).catch(err => {
            return Promise.reject(err);
        });
};



export async function recognizeUser(req, res) {
    try {
        const userRepo:UserRepo = getCustomRepository(UserRepo);

        // const {base64} = req.body;
        // const body = {
        //     base64: base64
        // };
        // const response = await request({
        //     url: 'http://vnuonline_openface:5000/recognize',
        //     method: 'POST',
        //     body: JSON.stringify(body)
        // });
        // let users;
        // const {faces} = response;
        // await faces.forEach(async face => {
        //     const user: User = await userRepo.findOne(face.user);
        //     users.push({id: user, img: face.img, confidence:face.confidence});
        // });
        // console.log(users);
        // req.locals.faces = users;
        //
        // return res.send(users);
        return res.send("");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

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
        let student: Student = await getCustomRepository(StudentRepo)
            .createQueryBuilder("student")
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
