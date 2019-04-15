import {EntityRepository, getRepository, Repository} from "typeorm";
import Resource from "../entities/Resource";
import User from "../entities/User";

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

    findByUserAndType(user: User, type: string) {
        return this.find({
            where: {
                owner: user,
                type: type
            },
            order: {
                createdTime: "ASC"
            }
        })
    }

    findAndMapUser(id: string) {
        return this.createQueryBuilder("resource")
            .innerJoinAndSelect("resource.owner","user").where("resource.id = :id", { id: id }).getOne();
    }
}

export default ResourceRepo;
