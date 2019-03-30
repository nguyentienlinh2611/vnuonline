import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import ClassSubject from "./ClassSubject";
import Attendance from "./Attendance";

@Entity("class_schedule")
class ClassSchedule {
    @PrimaryGeneratedColumn({type: "int"})
    id: number;
    @Column({type: "int" })
    periodFrom: number;
    @Column({type: "int" })
    periodTo: number;
    @Column({type: "varchar"})
    dayOfWeek: string;
    @Column({type: "varchar"})
    location: string;
    @Column({type: "varchar", nullable: true})
    description: string;
    @OneToOne(type => Attendance, attendance => attendance.classSchedule)
    attendance: Attendance;
    @ManyToOne(type => ClassSubject, classSubject => classSubject.classSchedules)
    @JoinColumn()
    classSubject: ClassSubject;
}

export default ClassSchedule;
