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
require("reflect-metadata");
const express = require("express");
const bodyParser = require("body-parser");
const typeorm_1 = require("typeorm");
const appConfig = require("./common/app-config");
const routers_1 = require("./routers");
/**
 * Create Express server.
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Primary app routes.
 */
/**
 * Create connection to DB using configuration provided in
 * appconfig file.
 */
typeorm_1.createConnection(appConfig.dbOptions).then((connection) => __awaiter(this, void 0, void 0, function* () {
    console.log("Connected to DB");
    routers_1.default.forEach(route => {
        if (route.method) {
            app[route.method](route.path, ...route.middleware, (request, response, next) => {
                route.action(request, response)
                    .then(() => next)
                    .catch(err => next(err));
            });
        }
    });
})).catch(error => console.log("TypeORM connection error: ", error));
app.use('/static', express.static('public'));
exports.default = app;
//# sourceMappingURL=App.js.map