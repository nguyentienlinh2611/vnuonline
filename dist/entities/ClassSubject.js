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
const Subject_1 = require("./Subject");
const Term_1 = require("./Term");
const ClassSchedule_1 = require("./ClassSchedule");
const Student_1 = require("./Student");
let ClassSubject = class ClassSubject {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: "varchar", length: 10 }),
    __metadata("design:type", String)
], ClassSubject.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Subject_1.default, subject => subject.classSubject),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Subject_1.default)
], ClassSubject.prototype, "subject", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Term_1.default, term => term.classSubject),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Term_1.default)
], ClassSubject.prototype, "term", void 0);
__decorate([
    typeorm_1.OneToMany(type => ClassSchedule_1.default, classSchedule => classSchedule.classSubject),
    __metadata("design:type", Array)
], ClassSubject.prototype, "classSchedules", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Student_1.default, student => student.classSubject),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], ClassSubject.prototype, "students", void 0);
ClassSubject = __decorate([
    typeorm_1.Entity("class_subject")
], ClassSubject);
exports.default = ClassSubject;
//# sourceMappingURL=ClassSubject.js.map