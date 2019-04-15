import ResourceRepo from "../repositories/ResourceRepo";
import {getCustomRepository} from "typeorm";
import Resource from "../entities/Resource";
import UserRepo from "../repositories/UserRepo";
import User from "../entities/User";

const thumb = require('node-thumbnail').thumb;

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
                destination: `data/known/${userId}/thumbnail`,
                width: 150
            });
            resource.thumbnailSource = `data/known/${userId}/thumbnail/${file.filename}`;
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
        const userRepo: UserRepo = getCustomRepository(UserRepo);
        const {userId} = req.authentication;

        const owner: User = await userRepo.findOne(userId);
        const resources: Array<Resource> = await resourceRepo.findByUserAndType(owner, "attendance_training");
        return res.send(resources);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}
