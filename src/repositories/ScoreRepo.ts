import Score from "../entities/Score";
import { getRepository } from "typeorm";
import Subject from "../entities/Subject";
import Term from "../entities/Term";

class ScoreRepo {
    async saveScore(score:Score) {
        var scr = await getRepository(Score).find({where:{term: score.term,subject: score.subject}});
        return getRepository(Score).save(score);
    }

    getScore(term:Term,subject:Subject) {
        return getRepository(Score).findOne({where:{term: term,subject: subject}});
    }

    getAllScores() {
        return getRepository(Score).find();
    }
}

export default ScoreRepo;