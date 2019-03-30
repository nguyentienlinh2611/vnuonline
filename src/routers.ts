import {recognizeUser, userRegister} from "./controllers/UserController";
import {signIn} from "./controllers/StudentController";
import {confirmAttendance, recognizePerson, takeRollCall, uploadImage} from "./controllers/AttendanceController";
import {isUserAuthenticated} from "./controllers/AuthorizeController";
import {
    getCurrentSchedulesOfClass,
    getCurrentSchedulesOfStudent,
    getSchedulesOfClassInTerm,
    getSchedulesOfStudentInTerm
} from "./controllers/ClassScheduleController";
import {teacherRegister} from "./controllers/TeacherController";
import {uploadTest, uploadTraining, uploadTrainingData} from "./controllers/ResourceController";
import {getTermScoresOfStudent} from "./controllers/TermController";

const AppRoutes = [
    {
        path: "/signin",
        method: "post",
        action: signIn,
        middleware: []
    },
    {
        path: "/signup",
        method: "post",
        action: teacherRegister,
        middleware: [userRegister]
    },
    {
        path: "/rollcall",
        method: "post",
        action: takeRollCall,
        middleware: [isUserAuthenticated, uploadTest.array("resource",20), recognizePerson]
    },
    {
        path: "/confirm",
        method: "post",
        action: confirmAttendance,
        middleware: [isUserAuthenticated]
    },
    {
        path: "/upload/face",
        method: "post",
        action: uploadTrainingData,
        middleware: [isUserAuthenticated, uploadTraining.array("images",20)]
    },
    {
        path: "/recognize",
        method: "post",
        action: recognizeUser,
        middleware: [isUserAuthenticated, uploadTest.array("images",20), recognizePerson]
    },
    {
        path: "/schedules/:termId",
        method: "get",
        action: getSchedulesOfStudentInTerm,
        middleware: [isUserAuthenticated]
    },
    {
        path: "/schedules",
        method: "get",
        action: getCurrentSchedulesOfStudent,
        middleware: [isUserAuthenticated]
    },
    {
        path: "/schedules/:subjectId/:termId",
        method: "get",
        action: getSchedulesOfClassInTerm,
        middleware: []
    },
    {
        path: "/schedules/:subjectId",
        method: "get",
        action: getCurrentSchedulesOfClass,
        middleware: []
    },
    {
        path: "/terms/scores",
        method: "get",
        action: getTermScoresOfStudent,
        middleware: [isUserAuthenticated]
    },
    {
        path: "/scores",
        method: "get",
        action: getTermScoresOfStudent,
        middleware: [isUserAuthenticated]
    },
    {
        path: "/scores/:subjectId",
        method: "get",
        action: getCurrentSchedulesOfStudent,
        middleware: [isUserAuthenticated]
    }
];

export default AppRoutes;
