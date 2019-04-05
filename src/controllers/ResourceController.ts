import * as multer from 'multer';
import ResourceRepo from "../repositories/ResourceRepo";
import {getCustomRepository} from "typeorm";
import * as fs from "fs";
import Resource from "../entities/Resource";
import Student from "../entities/Student";
import StudentRepo from "../repositories/StudentRepo";
import UserRepo from "../repositories/UserRepo";
import User from "../entities/User";
import {accessSync} from "fs";
const express= require("express");

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
        if (!isExists) {
            fs.mkdirSync(path);
            fs.mkdirSync(`./data/thumbnail/${userId}`);
        }
        cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
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
        const userRepo: UserRepo = getCustomRepository(UserRepo);

        const {userId} = req.authentication;

        const owner: User = await userRepo.findOne(userId);

        const {file} = req;
        let result = [];
        let resource: Resource = new Resource();
        resource.name = file.filename;
        resource.mimeType = file.mimetype;
        resource.source = file.path;
        resource.owner = owner;
        resource.createdTime = new Date();
        resource.type = "attendance_training";

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            thumb({
                prefix: '',
                suffix: '',
                source: file.path,
                destination: `data/thumbnail/${userId}`,
                width: 150
            });
            resource.thumbnailSource = `data/thumbnail/${userId}/${file.filename}`;
        }
        const resourceResult: Resource = await resourceRepo.save(resource);
        result.push(resourceResult);

        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export async function getResource(req, res) {
    try {
        const resourceRepo: ResourceRepo = getCustomRepository(ResourceRepo);

        const {userId} = req.authentication;
        const {resourceId} = req.params;
        const resource: Resource = await resourceRepo.findAndMapUser(resourceId);
        if (resource.owner.id !== userId) {
            return res.status(403).send("Access Denied");
        }

        if (resource.mimeType === 'image/jpeg' || resource.mimeType === 'image/png') {
            const {path} = req.route;
            if (path.includes('thumbnail')) {
                const {name, thumbnailSource} = resource;
                return res.download(thumbnailSource, `thumbnail_${name}`);
            }
        }
        const {name, source} = resource;

        return res.download(source, name);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export async function getFacesResource(req, res) {
    try {
        const resourceRepo: ResourceRepo = getCustomRepository(ResourceRepo);
        const {userId} = req.authentication;

        const resources: Array<Resource> = await resourceRepo.findByUserAndType(userId, "attendance_training");

        return res.send(resources);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}
