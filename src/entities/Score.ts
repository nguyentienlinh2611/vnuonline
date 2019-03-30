import {Entity, Column, JoinColumn, ManyToOne} from "typeorm";
import Subject from "./Subject";
import TermStudent from "./TermStudent";

@Entity("student_subject")
class Score {
    @Column({type: "double", nullable: true})
    diligentScore: number;
    @Column({type: "double", nullable: true})
    midtermScore: number;
    @Column({type: "double", nullable: true})
    endtermScore: number;
    @Column({type: "double"})
    tpsScore: number;
    @Column({type: "double"})
    fpsScore: number;
    @ManyToOne(type => TermStudent, term => term.scores, {
        primary: true,
        nullable: false,
    })
    @JoinColumn()
    termStudent: TermStudent;
    @ManyToOne(type => Subject, subject => subject.scores, {
        primary: true,
        nullable: false,
    })
    @JoinColumn()
    subject: Subject;
}

export default Score;
