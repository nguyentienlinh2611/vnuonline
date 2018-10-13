import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm";
import Score from "./Score";

@Entity("subject")
class Subject {
    @PrimaryColumn({type: "int"})
    subjectId: number;
    @Column()
    displayId: string;
    @Column()
    subjectName: string;
    @Column({type: "int"})
    creditNumber: number;
    @OneToMany(type => Score, score => score.term)
    scores: Score[];
}

export default Subject;