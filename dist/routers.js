"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./controllers/UserController");
const StudentController_1 = require("./controllers/StudentController");
const AttendanceController_1 = require("./controllers/AttendanceController");
const AuthorizeController_1 = require("./controllers/AuthorizeController");
const ClassScheduleController_1 = require("./controllers/ClassScheduleController");
const TeacherController_1 = require("./controllers/TeacherController");
const ResourceController_1 = require("./controllers/ResourceController");
const TermController_1 = require("./controllers/TermController");
const AppRoutes = [
    {
        path: "/signin",
        method: "post",
        action: StudentController_1.signIn,
        middleware: []
    },
    {
        path: "/signup",
        method: "post",
        action: TeacherController_1.teacherRegister,
        middleware: [UserController_1.userRegister]
    },
    {
        path: "/rollcall",
        method: "post",
        action: AttendanceController_1.takeRollCall,
        middleware: [AuthorizeController_1.isUserAuthenticated, ResourceController_1.uploadTest.array("resource", 20), AttendanceController_1.recognizePerson]
    },
    {
        path: "/confirm",
        method: "post",
        action: AttendanceController_1.confirmAttendance,
        middleware: [AuthorizeController_1.isUserAuthenticated]
    },
    {
        path: "/upload/face",
        method: "post",
        action: ResourceController_1.uploadTrainingData,
        middleware: [AuthorizeController_1.isUserAuthenticated, ResourceController_1.uploadTraining.single("images")]
    },
    {
        path: "/recognize",
        method: "post",
        action: UserController_1.recognizeUser,
        middleware: [AuthorizeController_1.isUserAuthenticated, ResourceController_1.uploadTest.single("images"), AttendanceController_1.recognizePerson]
    },
    {
        path: "/schedules/:termId",
        method: "get",
        action: ClassScheduleController_1.getSchedulesOfStudentInTerm,
        middleware: [AuthorizeController_1.isUserAuthenticated]
    },
    {
        path: "/schedules",
        method: "get",
        action: ClassScheduleController_1.getCurrentSchedulesOfStudent,
        middleware: [AuthorizeController_1.isUserAuthenticated]
    },
    {
        path: "/schedules/:subjectId/:termId",
        method: "get",
        action: ClassScheduleController_1.getSchedulesOfClassInTerm,
        middleware: []
    },
    {
        path: "/schedules/:subjectId",
        method: "get",
        action: ClassScheduleController_1.getCurrentSchedulesOfClass,
        middleware: []
    },
    {
        path: "/terms",
        method: "get",
        action: TermController_1.getTermScoresOfStudent,
        middleware: [AuthorizeController_1.isUserAuthenticated]
    },
    {
        path: "/scores",
        method: "get",
        action: TermController_1.getTermScoresOfStudent,
        middleware: [AuthorizeController_1.isUserAuthenticated]
    },
    {
        path: "/scores/:subjectId",
        method: "get",
        action: ClassScheduleController_1.getCurrentSchedulesOfStudent,
        middleware: [AuthorizeController_1.isUserAuthenticated]
    },
    {
        path: "/resource/face",
        method: "get",
        action: ResourceController_1.getFacesResource,
        middleware: [AuthorizeController_1.isUserAuthenticated]
    },
    {
        path: "/resource/thumbnail/:resourceId",
        method: "get",
        action: ResourceController_1.getResource,
        middleware: [AuthorizeController_1.isUserAuthenticated]
    },
    {
        path: "/resource/:resourceId",
        method: "get",
        action: ResourceController_1.getResource,
        middleware: [AuthorizeController_1.isUserAuthenticated]
    }
];
exports.default = AppRoutes;
//# sourceMappingURL=routers.js.map