"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Term_1 = require("../entities/Term");
const typeorm_1 = require("typeorm");
let TermRepo = class TermRepo extends typeorm_1.Repository {
    saveAll(termsList) {
        return __awaiter(this, void 0, void 0, function* () {
            yield termsList.forEach((term) => __awaiter(this, void 0, void 0, function* () {
                yield this.save(term);
            }));
        });
    }
    getAllTerms(id) {
        return this.find();
    }
};
TermRepo = __decorate([
    typeorm_1.EntityRepository(Term_1.default)
], TermRepo);
exports.default = TermRepo;
//# sourceMappingURL=TermRepo.js.map