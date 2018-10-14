import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, TableForeignKey, ManyToOne} from "typeorm";
import Student from "./Student";
import Term from "./Term";
import Subject from "./Subject";

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
    @ManyToOne(type => Term, term => term.scores, {
        primary: true,
        nullable: false,
    })
    @JoinColumn({name: "termAIId"})
    term: Term;
    @ManyToOne(type => Subject, subject => subject.scores, {
        primary: true,
        nullable: false,
    })
    @JoinColumn({ name: "subjectId" })
    subject: Subject;
}

export default Score;