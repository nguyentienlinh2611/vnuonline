import "reflect-metadata";
import {ConnectionOptions} from "typeorm";
import Student from "../entities/Student";
import Subject from "../entities/Subject";
import Score from "../entities/Score";
import Term from "../entities/Term";

export let dbOptions: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "vnuonline",
    entities: [
      Student,
      Subject,
      Score,
      Term
    ],
    synchronize: true,
    logging: false
};