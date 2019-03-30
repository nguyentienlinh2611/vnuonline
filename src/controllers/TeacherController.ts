import TeacherRepo from "../repositories/TeacherRepo";
import {getCustomRepository} from "typeorm";
import Teacher from "../entities/Teacher";

export async function teacherRegister(req, res) {
    try {
        const teacherRepo: TeacherRepo = getCustomRepository(TeacherRepo);

        const {userId} = req.locals;
        const {fullName, gender, email, phone, faculty} = req.body;

        let teacher: Teacher = new Teacher();
        teacher.fullName = fullName;
        teacher.gender = gender;
        teacher.email = email;
        teacher.phone = phone;
        teacher.faculty = faculty;
        teacher.id = userId;
        teacher = await teacherRepo.save(teacher);

        return res.send(teacher);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}
