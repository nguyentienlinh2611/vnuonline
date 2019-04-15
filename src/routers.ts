import {userRegister} from "./controllers/UserController";
import {signIn} from "./controllers/StudentController";
import {confirmAttendance, takeRollCall} from "./controllers/AttendanceController";
import {isUserAuthenticated} from "./controllers/AuthorizeController";
import {
    getCurrentSchedulesOfClass,
    getCurrentSchedulesOfStudent,
    getSchedulesOfClassInTerm,
    getSchedulesOfStudentInTerm
} from "./controllers/ClassScheduleController";
import {teacherRegister} from "./controllers/TeacherController";
import {
    getFacesResource,
    getResource,
    uploadTrainingData
} from "./controllers/ResourceController";
import {getTermScoresOfStudent} from "./controllers/TermController";
import {uploadTest, uploadTraining} from "./controllers/FileDataController";
import {detectionMiddleware, recognizeMiddleware, recognizePerson} from "./controllers/RecognizeController";

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
        middleware: [isUserAuthenticated, uploadTest.array("resource",20), detectionMiddleware, recognizeMiddleware]
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
        middleware: [isUserAuthenticated, uploadTraining.single("images"), detectionMiddleware]
    },
    {
        path: "/recognize",
        method: "post",
        action: recognizePerson,
        middleware: [isUserAuthenticated, uploadTest.single("images"), detectionMiddleware, recognizeMiddleware]
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
        path: "/terms",
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
    },
    {
        path: "/resource/face",
        method: "get",
        action: getFacesResource,
        middleware: [isUserAuthenticated]
    },
    {
        path: "/resource/thumbnail/:resourceId",
        method: "get",
        action: getResource,
        middleware: [isUserAuthenticated]
    },
    {
        path: "/resource/:resourceId",
        method: "get",
        action: getResource,
        middleware: [isUserAuthenticated]
    }
];

export default AppRoutes;
