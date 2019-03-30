import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Resource from "./Resource";

@Entity("user")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: "varchar"})
    hashPassword: string;
    @OneToMany(type => Resource, resource => resource.owner)
    resource: Resource[];
}

export default User;
