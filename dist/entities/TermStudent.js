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
const Score_1 = require("./Score");
const Term_1 = require("./Term");
let TermStudent = class TermStudent {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int" }),
    __metadata("design:type", Number)
], TermStudent.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Term_1.default, term => term.id),
    __metadata("design:type", Term_1.default)
], TermStudent.prototype, "term", void 0);
__decorate([
    typeorm_1.Column({ type: "double", nullable: true }),
    __metadata("design:type", Number)
], TermStudent.prototype, "gpaScore", void 0);
__decorate([
    typeorm_1.Column({ type: "double", nullable: true }),
    __metadata("design:type", Number)
], TermStudent.prototype, "cumulativeScore", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Student_1.default, student => student.terms),
    __metadata("design:type", Student_1.default)
], TermStudent.prototype, "student", void 0);
__decorate([
    typeorm_1.OneToMany(type => Score_1.default, score => score.termStudent),
    __metadata("design:type", Array)
], TermStudent.prototype, "scores", void 0);
TermStudent = __decorate([
    typeorm_1.Entity("term_student")
], TermStudent);
exports.default = TermStudent;
//# sourceMappingURL=TermStudent.js.map