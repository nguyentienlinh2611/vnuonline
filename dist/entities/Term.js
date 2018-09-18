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
let Term = class Term {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int" }),
    __metadata("design:type", Number)
], Term.prototype, "aiid", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Term.prototype, "termId", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Term.prototype, "displayId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Term.prototype, "termName", void 0);
__decorate([
    typeorm_1.Column({ type: "double", nullable: true }),
    __metadata("design:type", Number)
], Term.prototype, "gpaScore", void 0);
__decorate([
    typeorm_1.Column({ type: "double", nullable: true }),
    __metadata("design:type", Number)
], Term.prototype, "cumulativeScore", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Student_1.default, student => student.terms),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Student_1.default)
], Term.prototype, "student", void 0);
Term = __decorate([
    typeorm_1.Entity("term_student")
], Term);
exports.default = Term;
//# sourceMappingURL=Term.js.map