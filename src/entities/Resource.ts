import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./User";

@Entity("resource")
class Resource {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: "varchar"})
    source: string;
    @Column({type: "varchar"})
    mimeType: string;
    @Column({type: "varchar"})
    type: string;
    @Column({type: "varchar", nullable: true})
    thumbnailSource: string;
    @Column({type: "varchar", nullable: true})
    description: string;
    @Column({type: "date"})
    createdTime: Date;
    @ManyToOne(type => User, user => user.resource)
    owner: User;

}

export default Resource;
