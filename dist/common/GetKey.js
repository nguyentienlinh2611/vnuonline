"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
exports.privateKey = fs.readFileSync('private.key');
exports.publicKey = fs.readFileSync('public.key');
//# sourceMappingURL=GetKey.js.map