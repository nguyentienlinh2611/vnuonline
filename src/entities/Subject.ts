import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity("subject")
class Subject {
    @PrimaryColumn({type: "int"})
    subjectId: number;
    @Column()
    displayId: string;
    @Column()
    subjectName: string;
    @Column()
    subjectType: string;
    @Column({type: "int"})
    creditNumber: number;
}

export default Subject;