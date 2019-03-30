import {Entity, PrimaryColumn, Column, OneToMany, ManyToMany, OneToOne, JoinColumn} from "typeorm";
import Term from "./Term";
import TermStudent from "./TermStudent";
import Attendance from "./Attendance";
import User from "./User";
import ClassSubject from "./ClassSubject";

@Entity("student")
class Student {
    @PrimaryColumn({type: "int"})
    id: number;
    @Column({type: "int"})
    displayId: number;
    @Column()
    fullName: string;
    @Column({type: "date"})
    birthday: Date;
    @Column()
    gender: string;
    @Column()
    email: string;
    @Column()
    phone: string;
    @Column()
    address: string;
    @Column()
    hometown: string;
    @Column()
    country: string;
    @Column({type: "int", nullable: true})
    class: number;
    @Column({type: "varchar", nullable: true})
    branch: string;
    @OneToOne(type => User)
    @JoinColumn()
    user: User;
    @OneToMany(type => TermStudent, term => term.student)
    terms: Term[];
    @ManyToMany(type => Attendance, attendance => attendance.students)
    attendance: Attendance[];
    @ManyToMany(type => ClassSubject, classSubject => classSubject.students)
    classSubject: ClassSubject[];
}

export default Student;
