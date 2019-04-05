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
const Score_1 = require("./Score");
const ClassSubject_1 = require("./ClassSubject");
let Subject = class Subject {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: "varchar" }),
    __metadata("design:type", String)
], Subject.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Subject.prototype, "code", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Subject.prototype, "subjectName", void 0);
__decorate([
    typeorm_1.Column({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Subject.prototype, "creditNumber", void 0);
__decorate([
    typeorm_1.OneToMany(type => Score_1.default, score => score.subject),
    __metadata("design:type", Array)
], Subject.prototype, "scores", void 0);
__decorate([
    typeorm_1.OneToMany(type => ClassSubject_1.default, classSubject => classSubject.subject),
    __metadata("design:type", Array)
], Subject.prototype, "classSubject", void 0);
Subject = __decorate([
    typeorm_1.Entity("subject")
], Subject);
exports.default = Subject;
//# sourceMappingURL=Subject.js.map