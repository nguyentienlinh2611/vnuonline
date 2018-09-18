import Score from "../entities/Score";
import { getManager } from "typeorm";

class ScoreRepo {
    saveScore(score:Score) {
        return getManager().getRepository(Score).save(score);
    }
    getScore(studentId:number,subjectId:number) {
    }
    getAllScores(studentId:number) {
        return getManager().getRepository(Score).findOne(studentId);
    }
}

export default ScoreRepo;