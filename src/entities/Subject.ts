import {Entity, Column, OneToMany, PrimaryColumn} from "typeorm";
import Score from "./Score";
import ClassSubject from "./ClassSubject";

@Entity("subject")
class Subject {
    @PrimaryColumn({type: "varchar"})
    id: string;
    @Column({type: "int", nullable: true})
    code: number;
    @Column()
    subjectName: string;
    @Column({type: "int", nullable: true})
    creditNumber: number;
    @OneToMany(type => Score, score => score.subject)
    scores: Score[];
    @OneToMany(type => ClassSubject, classSubject => classSubject.subject)
    classSubject: ClassSubject[];
}

export default Subject;
