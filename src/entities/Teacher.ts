import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import User from "./User";
import Attendance from "./Attendance";

@Entity("teacher")
class Teacher {
    @PrimaryColumn()
    @OneToOne(type => User)
    @JoinColumn({name: "id"})
    id: User;
    @Column()
    fullName: string;
    @Column()
    gender: string;
    @Column()
    email: string;
    @Column({type:"varchar", nullable: true})
    phone: string;
    @Column({type: "varchar", nullable: true})
    faculty: string;
    @OneToMany(type => Attendance, attendance => attendance.teacher)
    attendance: Attendance[];
}

export default Teacher;
