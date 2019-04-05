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
const Teacher_1 = require("../entities/Teacher");
const User_1 = require("../entities/User");
const UserRepo_1 = require("../repositories/UserRepo");
const StudentRepo_1 = require("../repositories/StudentRepo");
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
exports.request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
        .then(response => response.json().then(json => {
        if (!response.ok) {
            return Promise.reject(json);
        }
        return json;
    }).catch(err => {
        return Promise.reject(err);
    })).catch(err => {
        return Promise.reject(err);
    });
};
function recognizeUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRepo = typeorm_1.getCustomRepository(UserRepo_1.default);
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
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.recognizeUser = recognizeUser;
function userRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRepo = typeorm_1.getCustomRepository(UserRepo_1.default);
            const { password } = req.body;
            let newUser = new User_1.default();
            newUser.hashPassword = yield bcrypt.hashSync(password, 10);
            const user = yield userRepo.save(newUser);
            req.locals.userId = user.id;
            next();
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.userRegister = userRegister;
function checkAuthentication(username, password, type) {
    return __awaiter(this, void 0, void 0, function* () {
        let hashPassword;
        let userId;
        if (type === "STUDENT") {
            let student = yield typeorm_1.getCustomRepository(StudentRepo_1.default)
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
//# sourceMappingURL=UserController.js.map