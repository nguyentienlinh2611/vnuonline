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
const fs = require("fs");
function Base64ToImage(folderPath, fileName, base64) {
    return __awaiter(this, void 0, void 0, function* () {
        const isFolderExists = yield fs.existsSync(folderPath);
        if (!isFolderExists) {
            yield fs.mkdirSync(folderPath);
        }
        yield fs.writeFileSync(`${folderPath}/${fileName}`, Buffer.from(base64, 'base64'));
        return Promise.resolve(`${folderPath}/${fileName}`);
    });
}
exports.Base64ToImage = Base64ToImage;
//# sourceMappingURL=FileUtils.js.map