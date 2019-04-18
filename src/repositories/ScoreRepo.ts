import Score from "../entities/Score";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Score)
class ScoreRepo extends Repository<Score>{
    async saveAll(scoresList: Array<Score>) {
        await scoresList.forEach(async score => {
            await this.save(score);
        })
    }
}

export default ScoreRepo;
