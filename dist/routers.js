"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetStudentInfo_1 = require("./controllers/GetStudentInfo");
const AppRoutes = [
    {
        path: "/signin",
        method: "post",
        action: GetStudentInfo_1.signInStudent
    }
];
exports.default = AppRoutes;
//# sourceMappingURL=routers.js.map