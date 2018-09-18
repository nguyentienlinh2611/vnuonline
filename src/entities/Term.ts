import {Entity, PrimaryColumn, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm";
import Student from "./Student";

@Entity("term_student")
class Term {
    @PrimaryGeneratedColumn({type: "int"})
    aiid: number;
    @Column({type: "int"})
    termId: number;
    @Column({type: "int"})
    displayId: number;
    @Column()
    termName: string;
    @Column({type: "double", nullable: true})
    gpaScore: number;
    @Column({type: "double", nullable: true})
    cumulativeScore: number;
    @ManyToOne(type => Student, student => student.terms)
    @JoinColumn()
    student: Student;
}

export default Term;