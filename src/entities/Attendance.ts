import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import Student from "./Student";
import ClassSchedule from "./ClassSchedule";
import AttendanceResource from "./AttendanceResource";
import Teacher from "./Teacher";

@Entity("class_attendance")
class Attendance {
    @PrimaryGeneratedColumn({type: "int"})
    id: number;
    @Column({type: "int"})
    weekTime: number;
    @Column({type: "date"})
    createdTime: Date;
    @Column({type: "date", nullable: true})
    updatedTime: Date;
    @Column({type: "varchar", nullable: true})
    description: string;
    @OneToOne(type => ClassSchedule, classSchedule => classSchedule.attendance)
    @JoinColumn()
    classSchedule: ClassSchedule;
    @ManyToMany(type => Student, student => student.attendance)
    @JoinTable()
    students: Student[];
    @ManyToOne(type => Teacher, teacher => teacher.attendance)
    teacher: Teacher;
    @OneToMany(type => AttendanceResource, resource => resource.attendance)
    images: AttendanceResource[];
}

export default Attendance;
