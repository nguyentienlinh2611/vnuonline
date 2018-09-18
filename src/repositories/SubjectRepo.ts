import Subject from "../entities/Subject";
import { getManager } from "typeorm";

class SubjectRepo {
    saveSubject(subject:Subject) {
        return getManager().getRepository(Subject).save(subject);
    }
    getSubject(subjectId: number) {
        return getManager().getRepository(Subject).findOne(subjectId);
    }
}

export default SubjectRepo;