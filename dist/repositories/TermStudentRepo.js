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
const typeorm_1 = require("typeorm");
const TermStudent_1 = require("../entities/TermStudent");
let TermStudentRepo = class TermStudentRepo extends typeorm_1.Repository {
    saveAll(termStudentsList) {
        return __awaiter(this, void 0, void 0, function* () {
            yield termStudentsList.forEach((termStudent) => __awaiter(this, void 0, void 0, function* () {
                yield this.save(termStudent);
            }));
        });
    }
    getAllTermsByTerm(term) {
        return this.find({ term: term });
    }
    getTermById(id) {
        return this.findOne({ id: id });
    }
    getAllTermsOfStudent(student) {
        return this.createQueryBuilder("term_student").leftJoinAndSelect("term_student.term", "term").orderBy("term.id", "ASC").getMany();
    }
    getTermByTermAndStudent(student, term) {
        return this.findOne({ student, term });
    }
};
TermStudentRepo = __decorate([
    typeorm_1.EntityRepository(TermStudent_1.default)
], TermStudentRepo);
exports.default = TermStudentRepo;
//# sourceMappingURL=TermStudentRepo.js.map