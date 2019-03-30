import Score from "../entities/Score";
import {EntityRepository, Repository} from "typeorm";
import Subject from "../entities/Subject";
import TermStudent from "../entities/TermStudent";

@EntityRepository(Score)
class ScoreRepo extends Repository<Score>{
    async saveAll(scoresList: Array<Score>) {
        await scoresList.forEach(async score => {
            await this.save(score);
        })
    }

    getScore(term: TermStudent, subject: Subject) {
        return this.findOne({where: {term: term, subject: subject}});
    }

    getAllScores() {
        return this.find();
    }
}

export default ScoreRepo;
