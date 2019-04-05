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
const User_1 = require("./User");
let Resource = class Resource {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Resource.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar" }),
    __metadata("design:type", String)
], Resource.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar" }),
    __metadata("design:type", String)
], Resource.prototype, "source", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar" }),
    __metadata("design:type", String)
], Resource.prototype, "mimeType", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar" }),
    __metadata("design:type", String)
], Resource.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "thumbnailSource", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", Date)
], Resource.prototype, "createdTime", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.default, user => user.resource),
    __metadata("design:type", User_1.default)
], Resource.prototype, "owner", void 0);
Resource = __decorate([
    typeorm_1.Entity("resource")
], Resource);
exports.default = Resource;
//# sourceMappingURL=Resource.js.map