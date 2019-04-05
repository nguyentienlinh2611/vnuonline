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
const multer = require("multer");
const ResourceRepo_1 = require("../repositories/ResourceRepo");
const typeorm_1 = require("typeorm");
const fs = require("fs");
const Resource_1 = require("../entities/Resource");
const UserRepo_1 = require("../repositories/UserRepo");
const express = require("express");
const thumb = require('node-thumbnail').thumb;
const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const trainingStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { userId } = req.authentication;
        const path = './data/known/' + userId;
        const isExists = fs.existsSync(path);
        if (!isExists) {
            fs.mkdirSync(path);
            fs.mkdirSync(`./data/thumbnail/${userId}`);
        }
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const testStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './data/unknown');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.uploadTraining = multer({
    storage: trainingStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: imageFilter
});
exports.uploadTest = multer({
    storage: testStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: imageFilter
});
function uploadTrainingData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resourceRepo = typeorm_1.getCustomRepository(ResourceRepo_1.default);
            const userRepo = typeorm_1.getCustomRepository(UserRepo_1.default);
            const { userId } = req.authentication;
            const owner = yield userRepo.findOne(userId);
            const { file } = req;
            let result = [];
            let resource = new Resource_1.default();
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
            const resourceResult = yield resourceRepo.save(resource);
            result.push(resourceResult);
            return res.send(result);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.uploadTrainingData = uploadTrainingData;
function getResource(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resourceRepo = typeorm_1.getCustomRepository(ResourceRepo_1.default);
            const { userId } = req.authentication;
            const { resourceId } = req.params;
            const resource = yield resourceRepo.findAndMapUser(resourceId);
            if (resource.owner.id !== userId) {
                return res.status(403).send("Access Denied");
            }
            if (resource.mimeType === 'image/jpeg' || resource.mimeType === 'image/png') {
                const { path } = req.route;
                if (path.includes('thumbnail')) {
                    const { name, thumbnailSource } = resource;
                    return res.download(thumbnailSource, `thumbnail_${name}`);
                }
            }
            const { name, source } = resource;
            return res.download(source, name);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.getResource = getResource;
function getFacesResource(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resourceRepo = typeorm_1.getCustomRepository(ResourceRepo_1.default);
            const { userId } = req.authentication;
            const resources = yield resourceRepo.findByUserAndType(userId, "attendance_training");
            return res.send(resources);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.getFacesResource = getFacesResource;
//# sourceMappingURL=ResourceController.js.map