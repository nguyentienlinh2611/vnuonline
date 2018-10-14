import Subject from "../entities/Subject";
import { getRepository } from "typeorm";

class SubjectRepo {
    saveSubject(subject:Subject) {
        return getRepository(Subject).save(subject);
    }

    getAllSubjects() {
        return getRepository(Subject).find();
    }

    getAllSubjectsOfStudent() {

    }

    getSubjectById(subjectId: number) {
        return getRepository(Subject).findOne(subjectId);
    }
}

export default SubjectRepo;