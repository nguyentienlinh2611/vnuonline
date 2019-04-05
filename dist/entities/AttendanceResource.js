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
const Resource_1 = require("./Resource");
const Attendance_1 = require("./Attendance");
let AttendanceResource = class AttendanceResource {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    typeorm_1.OneToOne(type => Resource_1.default),
    typeorm_1.JoinColumn({ name: "id" }),
    __metadata("design:type", Resource_1.default)
], AttendanceResource.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Attendance_1.default, attendance => attendance.images),
    __metadata("design:type", Attendance_1.default)
], AttendanceResource.prototype, "attendance", void 0);
AttendanceResource = __decorate([
    typeorm_1.Entity("attendance_resource")
], AttendanceResource);
exports.default = AttendanceResource;
//# sourceMappingURL=AttendanceResource.js.map