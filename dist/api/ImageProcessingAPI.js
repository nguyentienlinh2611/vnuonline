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
const axios_1 = require("axios");
exports.DetectionAPI = (images, aligned, folder) => __awaiter(this, void 0, void 0, function* () {
    return axios_1.default({
        url: 'http://vnuonline_openface:9000/detection',
        method: 'POST',
        data: { images, aligned, folder },
        headers: {
            'Content-Type': 'application/json'
        }
    });
});
exports.RecognizeAPI = (faces) => __awaiter(this, void 0, void 0, function* () {
    return axios_1.default({
        url: 'http://vnuonline_openface:5000/recognize',
        method: 'POST',
        data: { faces },
        headers: {
            'Content-Type': 'application/json'
        }
    });
});
exports.ConfirmAPI = (images) => __awaiter(this, void 0, void 0, function* () {
    return axios_1.default({
        url: 'http://vnuonline_openface:5000/confirm',
        method: 'POST',
        data: { images },
        headers: {
            'Content-Type': 'application/json'
        }
    });
});
//# sourceMappingURL=ImageProcessingAPI.js.map