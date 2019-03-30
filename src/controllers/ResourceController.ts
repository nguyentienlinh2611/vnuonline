import * as multer from 'multer';
import ResourceRepo from "../repositories/ResourceRepo";
import {getCustomRepository} from "typeorm";
import * as fs from "fs";
import Resource from "../entities/Resource";

const thumb = require('node-thumbnail').thumb;

const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const trainingStorage = multer.diskStorage({
    destination: function (req: any, file, cb) {
        const {userId} = req.authentication;
        const path = './data/known/' + userId;
        const isExists = fs.existsSync(path);
        if(!isExists) {
            fs.mkdirSync(path);
            fs.mkdirSync(`./data/thumbnail/${userId}`);
        }
        cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
});

const testStorage = multer.diskStorage({
    destination: function (req: any, file, cb) {
        cb(null, './data/unknown')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

export const uploadTraining = multer({
    storage: trainingStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: imageFilter
});


export const uploadTest = multer({
    storage: testStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: imageFilter
});

export async function uploadTrainingData(req, res) {
    try {
        const resourceRepo: ResourceRepo = getCustomRepository(ResourceRepo);
        const {userId} = req.authentication;
        const {files} = req;
        let result = [];
        files.forEach(file => {
            let resource: Resource = new Resource();
            resource.mimeType = file.mimetype;
            resource.source = file.path;
            resource.createdTime = new Date();
            resource.owner = userId;
            resource.type = "attendance_training";

            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                thumb({
                    source: file.path,
                    destination: `data/thumbnail/${userId}`,
                    width: 150
                });
                resource.thumbnailSource = `data/thumbnail/${userId}/${file.filename}`;
            }
            resourceRepo.save(resource);
            result.push(resource);
        });

        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}
