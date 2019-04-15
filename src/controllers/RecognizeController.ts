import UserRepo from "../repositories/UserRepo";
import {getCustomRepository} from "typeorm";
import * as fs from "fs";
import {ConfirmAPI, DetectionAPI, RecognizeAPI} from "../api/ImageProcessingAPI";
import User from "../entities/User";
import StudentRepo from "../repositories/StudentRepo";

const pathutil = require('path');

export const detectionMiddleware = async (req,res,next) => {
    try {
        const {file, path} = req;
        const images = {path: file.path, filename: file.filename};
        if(path.includes('upload/face')){
            const {userId} = req.authentication;
            const axios_res = await DetectionAPI(images, `data/known/aligned/${userId}`, `data/known/${userId}`);
            res.locals.detection = axios_res.data.result;
            next();
        }
        const axios_res = await DetectionAPI(images, 'data/unknown/aligned', 'data/unknown');
        res.locals.detection = axios_res.data.result;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const recognizeMiddleware = async (req, res, next) => {
    try {
        const {files} = req;
        const {detection} = res.locals;

        const faces = detection[0].faces.map(face => face.face_aligned);
        const axios_res = await RecognizeAPI(faces);
        res.locals.recognize = axios_res.data;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const confirmPerson = async (req, res) => {
    try {
        const {images} = req.body;
        await ConfirmAPI(images);
        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

export const recognizePerson = async (req,res) => {
    try {
        const stdRepo: StudentRepo = getCustomRepository(StudentRepo);

        const {recognize} = res.locals;
        const result = [];
        for (let i=0;i<recognize.faces.length;i++) {
            let userId = recognize.faces[i];
            const student = await stdRepo.getStudentByUserId(userId);
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
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};
