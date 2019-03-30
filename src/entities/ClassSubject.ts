import {Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import Subject from "./Subject";
import Term from "./Term";
import ClassSchedule from "./ClassSchedule";
import Student from "./Student";

@Entity("class_subject")
class ClassSubject {
    @PrimaryColumn({type: "varchar",length: 10})
    id: String;
    @ManyToOne(type => Subject, subject => subject.classSubject)
    @JoinColumn()
    subject: Subject;
    @ManyToOne(type => Term, term => term.classSubject)
    @JoinColumn()
    term: Term;
    @OneToMany(type => ClassSchedule, classSchedule => classSchedule.classSubject)
    classSchedules: ClassSchedule[];
    @ManyToMany(type => Student, student => student.classSubject)
    @JoinTable()
    students: Student[];
}

export default ClassSubject;
