"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const fs = require("fs");
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
        }
        const thumbnailPath = `./data/known/${userId}/thumbnail`;
        const thumbnailExists = fs.existsSync(thumbnailPath);
        if (!thumbnailExists) {
            fs.mkdirSync(thumbnailPath);
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
//# sourceMappingURL=FileDataController.js.map