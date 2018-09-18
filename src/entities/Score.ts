import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, TableForeignKey} from "typeorm";
import Student from "./Student";
import Term from "./Term";
import Subject from "./Subject";

@Entity("student_subject")
class Score {
    @PrimaryColumn({type: "int"})
    subjectId: number;
    @PrimaryColumn({type: "int"})
    termId: number
    @Column({type: "double"})
    diligentScore: number;
    @Column({type: "double"})
    midtermScore: number;
    @Column({type: "double"})
    endtermScore: number;
    @Column({type: "double"})
    tpsScore: number;
    @Column({type: "double"})
    fpsScore: number;
    @OneToOne(type => Term)
    @JoinColumn({ name: "termId" })
    term: Term;
    @OneToOne(type => Subject)
    @JoinColumn({ name: "subjectId" })
    subject: Subject;
}

export default Score;