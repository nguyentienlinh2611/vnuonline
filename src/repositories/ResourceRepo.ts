import {EntityRepository, getRepository, Repository} from "typeorm";
import Resource from "../entities/Resource";

@EntityRepository(Resource)
class ResourceRepo extends Repository<Resource>{
    async saveAll(resources: Array<Resource>) {
        await resources.forEach(async resource => {
            await this.save(resource);
        });
    }

    findByUser(userId: string) {
        return this.find({
            where: {
                ownerId: userId
            },
            order: {
                createdTime: "ASC"
            }
        })
    }

    findByUserAndType(userId: string, type: string) {
        return this.find({
            where: {
                ownerId: userId,
                type: type
            },
            order: {
                createdTime: "ASC"
            }
        })
    }
}

export default ResourceRepo;
