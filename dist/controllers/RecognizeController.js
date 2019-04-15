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
const ImageProcessingAPI_1 = require("../api/ImageProcessingAPI");
const StudentRepo_1 = require("../repositories/StudentRepo");
const pathutil = require('path');
exports.detectionMiddleware = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { file, path } = req;
        const images = { path: file.path, filename: file.filename };
        if (path.includes('upload/face')) {
            const { userId } = req.authentication;
            const axios_res = yield ImageProcessingAPI_1.DetectionAPI(images, `data/known/aligned/${userId}`, `data/known/${userId}`);
            res.locals.detection = axios_res.data.result;
            next();
        }
        const axios_res = yield ImageProcessingAPI_1.DetectionAPI(images, 'data/unknown/aligned', 'data/unknown');
        res.locals.detection = axios_res.data.result;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
exports.recognizeMiddleware = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { files } = req;
        const { detection } = res.locals;
        const faces = detection[0].faces.map(face => face.face_aligned);
        const axios_res = yield ImageProcessingAPI_1.RecognizeAPI(faces);
        res.locals.recognize = axios_res.data;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
exports.confirmPerson = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { images } = req.body;
        yield ImageProcessingAPI_1.ConfirmAPI(images);
        return res.send();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
exports.recognizePerson = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const stdRepo = typeorm_1.getCustomRepository(StudentRepo_1.default);
        const { recognize } = res.locals;
        const result = [];
        for (let i = 0; i < recognize.faces.length; i++) {
            let userId = recognize.faces[i];
            const student = yield stdRepo.getStudentByUserId(userId);
            result.push({
                id: student.id,
                fullName: student.fullName,
                email: student.email,
                class: student.class,
                birthday: student.birthday,
                branch: student.branch,
                hometown: student.hometown
            });
        }
        return res.send(result);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
//# sourceMappingURL=RecognizeController.js.map