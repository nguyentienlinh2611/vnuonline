import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm";
import TermStudent from "./TermStudent";
import ClassSubject from "./ClassSubject";

@Entity("term")
class Term {
    @PrimaryColumn({type: "int"})
    id: number;
    @Column()
    termName: string;
    @OneToMany(type => TermStudent, termStudent => termStudent.term)
    termStudent: TermStudent[];
    @OneToMany(type => ClassSubject, classSubject => classSubject.term)
    classSubject: ClassSubject[];
}

export default Term;
