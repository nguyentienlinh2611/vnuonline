"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Student_1 = require("./Student");
const ClassSchedule_1 = require("./ClassSchedule");
const AttendanceResource_1 = require("./AttendanceResource");
const Teacher_1 = require("./Teacher");
let Attendance = class Attendance {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int" }),
    __metadata("design:type", Number)
], Attendance.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Attendance.prototype, "weekTime", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", Date)
], Attendance.prototype, "createdTime", void 0);
__decorate([
    typeorm_1.Column({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Attendance.prototype, "updatedTime", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Attendance.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToOne(type => ClassSchedule_1.default, classSchedule => classSchedule.attendance),
    typeorm_1.JoinColumn(),
    __metadata("design:type", ClassSchedule_1.default)
], Attendance.prototype, "classSchedule", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Student_1.default, student => student.attendance),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Attendance.prototype, "students", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Teacher_1.default, teacher => teacher.attendance),
    __metadata("design:type", Teacher_1.default)
], Attendance.prototype, "teacher", void 0);
__decorate([
    typeorm_1.OneToMany(type => AttendanceResource_1.default, resource => resource.attendance),
    __metadata("design:type", Array)
], Attendance.prototype, "images", void 0);
Attendance = __decorate([
    typeorm_1.Entity("class_attendance")
], Attendance);
exports.default = Attendance;
//# sourceMappingURL=Attendance.js.map