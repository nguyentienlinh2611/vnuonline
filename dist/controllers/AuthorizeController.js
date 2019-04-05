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
const jwt = require('jsonwebtoken');
function getBearerToken(authHeader) {
    const headerParser = authHeader.split(" ");
    if (headerParser[0] === "JWT") {
        const token = headerParser[1];
        return token;
    }
    return false;
}
exports.isUserAuthenticated = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ error: "Truy cập trái phép, vui lòng thử lại!" });
    }
    else {
        const token = getBearerToken(authHeader);
        if (token) {
            try {
                jwt.verify(token, "VNUONLINE", function (err, decode) {
                    if (err) {
                        return res.status(401).json({ error: "Truy cập trái phép, vui lòng thử lại!" });
                    }
                    req.authentication = {
                        userId: decode.userId
                    };
                    next();
                });
            }
            catch (err) {
                return res.status(401).json({ error: "Truy cập trái phép, vui lòng thử lại!" });
            }
        }
        else {
            return res.status(403).json({ error: "Truy cập trái phép, vui lòng thử lại!" });
        }
    }
});
//# sourceMappingURL=AuthorizeController.js.map