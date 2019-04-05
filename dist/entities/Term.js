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
const TermStudent_1 = require("./TermStudent");
const ClassSubject_1 = require("./ClassSubject");
let Term = class Term {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: "int" }),
    __metadata("design:type", Number)
], Term.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Term.prototype, "termName", void 0);
__decorate([
    typeorm_1.OneToMany(type => TermStudent_1.default, termStudent => termStudent.term),
    __metadata("design:type", Array)
], Term.prototype, "termStudent", void 0);
__decorate([
    typeorm_1.OneToMany(type => ClassSubject_1.default, classSubject => classSubject.term),
    __metadata("design:type", Array)
], Term.prototype, "classSubject", void 0);
Term = __decorate([
    typeorm_1.Entity("term")
], Term);
exports.default = Term;
//# sourceMappingURL=Term.js.map