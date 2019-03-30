import Term from "../entities/Term";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Term)
class TermRepo extends Repository<Term> {
    async saveAll(termsList: Array<Term>) {
        await termsList.forEach(async term => {
            await this.save(term);
        })
    }

    getAllTerms(id: number) {
        return this.find();
    }
}

export default TermRepo;
