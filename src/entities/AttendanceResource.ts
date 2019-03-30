import {Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import Resource from "./Resource";
import Attendance from "./Attendance";

@Entity("attendance_resource")
class AttendanceResource {
    @PrimaryColumn()
    @OneToOne(type => Resource)
    @JoinColumn({name: "id"})
    id: Resource;
    @ManyToOne(type => Attendance, attendance => attendance.images)
    attendance: Attendance;
}

export default AttendanceResource;
