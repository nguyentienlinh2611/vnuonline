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
const Term_1 = require("./Term");
let Student = class Student {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: "int" }),
    __metadata("design:type", Number)
], Student.prototype, "studentId", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Student.prototype, "displayId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "fullName", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", Date)
], Student.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "hometown", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "country", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Student.prototype, "class", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "branch", void 0);
__decorate([
    typeorm_1.OneToMany(type => Term_1.default, term => term.student),
    __metadata("design:type", Array)
], Student.prototype, "terms", void 0);
Student = __decorate([
    typeorm_1.Entity("student")
], Student);
exports.default = Student;
//# sourceMappingURL=Student.js.map