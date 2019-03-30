import {Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm";
import Student from "./Student";
import Score from "./Score";
import Term from "./Term";

@Entity("term_student")
class TermStudent {
    @PrimaryGeneratedColumn({type: "int"})
    id: number;
    @ManyToOne(type => Term, term => term.id)
    term: Term;
    @Column({type: "double", nullable: true})
    gpaScore: number;
    @Column({type: "double", nullable: true})
    cumulativeScore: number;
    @ManyToOne(type => Student, student => student.terms)
    student: Student;
    @OneToMany(type => Score, score => score.termStudent)
    scores: Score[];
}

export default TermStudent;
