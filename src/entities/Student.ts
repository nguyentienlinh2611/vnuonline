import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm";
import Term from "./Term";

@Entity("student")
class Student {
    @PrimaryColumn({type: "int"})
    studentId: number;
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
    @Column({type: "int"})
    class: number;
    @Column()
    branch: string;
    @OneToMany(type => Term, term => term.student)
    terms: Term[];
}

export default Student;