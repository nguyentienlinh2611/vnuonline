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
const Subject_1 = require("./Subject");
let Score = class Score {
};
__decorate([
    typeorm_1.Column({ type: "double", nullable: true }),
    __metadata("design:type", Number)
], Score.prototype, "diligentScore", void 0);
__decorate([
    typeorm_1.Column({ type: "double", nullable: true }),
    __metadata("design:type", Number)
], Score.prototype, "midtermScore", void 0);
__decorate([
    typeorm_1.Column({ type: "double", nullable: true }),
    __metadata("design:type", Number)
], Score.prototype, "endtermScore", void 0);
__decorate([
    typeorm_1.Column({ type: "double" }),
    __metadata("design:type", Number)
], Score.prototype, "tpsScore", void 0);
__decorate([
    typeorm_1.Column({ type: "double" }),
    __metadata("design:type", Number)
], Score.prototype, "fpsScore", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Term_1.default, term => term.scores, {
        primary: true,
        nullable: false,
    }),
    typeorm_1.JoinColumn({ name: "termAIId" }),
    __metadata("design:type", Term_1.default)
], Score.prototype, "term", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Subject_1.default, subject => subject.scores, {
        primary: true,
        nullable: false,
    }),
    typeorm_1.JoinColumn({ name: "subjectId" }),
    __metadata("design:type", Subject_1.default)
], Score.prototype, "subject", void 0);
Score = __decorate([
    typeorm_1.Entity("student_subject")
], Score);
exports.default = Score;
//# sourceMappingURL=Score.js.map