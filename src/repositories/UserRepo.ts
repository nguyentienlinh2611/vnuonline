import User from "../entities/User";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(User)
class UserRepo extends Repository<User>{

}

export default UserRepo;
