import { signInStudent } from "./controllers/GetStudentInfo"; 

const AppRoutes = [
    {
        path: "/signin",
        method: "post",
        action: signInStudent
    }
];

export default AppRoutes;