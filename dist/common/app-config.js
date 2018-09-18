"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Student_1 = require("../entities/Student");
const Subject_1 = require("../entities/Subject");
const Score_1 = require("../entities/Score");
const Term_1 = require("../entities/Term");
exports.dbOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "vnuonline",
    entities: [
        Student_1.default,
        Subject_1.default,
        Score_1.default,
        Term_1.default
    ],
    synchronize: true,
    logging: false
};
//# sourceMappingURL=app-config.js.map