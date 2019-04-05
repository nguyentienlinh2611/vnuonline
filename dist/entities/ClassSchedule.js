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
const ClassSubject_1 = require("./ClassSubject");
const Attendance_1 = require("./Attendance");
let ClassSchedule = class ClassSchedule {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int" }),
    __metadata("design:type", Number)
], ClassSchedule.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], ClassSchedule.prototype, "periodFrom", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], ClassSchedule.prototype, "periodTo", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar" }),
    __metadata("design:type", String)
], ClassSchedule.prototype, "dayOfWeek", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar" }),
    __metadata("design:type", String)
], ClassSchedule.prototype, "location", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], ClassSchedule.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToOne(type => Attendance_1.default, attendance => attendance.classSchedule),
    __metadata("design:type", Attendance_1.default)
], ClassSchedule.prototype, "attendance", void 0);
__decorate([
    typeorm_1.ManyToOne(type => ClassSubject_1.default, classSubject => classSubject.classSchedules),
    typeorm_1.JoinColumn(),
    __metadata("design:type", ClassSubject_1.default)
], ClassSchedule.prototype, "classSubject", void 0);
ClassSchedule = __decorate([
    typeorm_1.Entity("class_schedule")
], ClassSchedule);
exports.default = ClassSchedule;
//# sourceMappingURL=ClassSchedule.js.map