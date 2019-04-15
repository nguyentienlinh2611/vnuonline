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
const ResourceRepo_1 = require("../repositories/ResourceRepo");
const typeorm_1 = require("typeorm");
const Resource_1 = require("../entities/Resource");
const UserRepo_1 = require("../repositories/UserRepo");
const thumb = require('node-thumbnail').thumb;
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
                    destination: `data/known/${userId}/thumbnail`,
                    width: 150
                });
                resource.thumbnailSource = `data/known/${userId}/thumbnail/${file.filename}`;
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
            const userRepo = typeorm_1.getCustomRepository(UserRepo_1.default);
            const { userId } = req.authentication;
            const owner = yield userRepo.findOne(userId);
            const resources = yield resourceRepo.findByUserAndType(owner, "attendance_training");
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