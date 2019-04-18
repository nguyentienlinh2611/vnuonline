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
const ClassSchedule_1 = require("../entities/ClassSchedule");
const Term_1 = require("../entities/Term");
let ClassScheduleRepo = class ClassScheduleRepo extends typeorm_1.Repository {
    saveAll(classScheduleList) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < classScheduleList.length; i++) {
                let classSchedule = classScheduleList[i];
                yield this.createQueryBuilder("cs")
                    .leftJoinAndSelect("cs.classSubject", "class")
                    .where("class.id = :classSchedule", { classSchedule: classSchedule.classSubject.id })
                    .getMany().then((existSchedules) => __awaiter(this, void 0, void 0, function* () {
                    let i = 0;
                    const isExist = function () {
                        for (i; i < existSchedules.length; i++) {
                            let exSche = existSchedules[i];
                            if (exSche.periodFrom == classSchedule.periodFrom
                                && exSche.periodTo == classSchedule.periodTo
                                && exSche.dayOfWeek == classSchedule.dayOfWeek) {
                                return true;
                            }
                        }
                        return false;
                    };
                    if (!isExist()) {
                        yield this.save(classSchedule);
                    }
                }));
            }
        });
    }
    getScheduleOfClassSubjectInTerm(classId, termId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.createQueryBuilder("schedule")
                .innerJoinAndSelect("schedule.classSubject", "class", "class.id LIKE :classId")
                .innerJoinAndMapOne("schedule.term", Term_1.default, "term", "term.id = :termId")
                .setParameters({ classId: `%${classId}%`, termId: termId });
            return query.getMany();
        });
    }
};
ClassScheduleRepo = __decorate([
    typeorm_1.EntityRepository(ClassSchedule_1.default)
], ClassScheduleRepo);
exports.default = ClassScheduleRepo;
//# sourceMappingURL=ClassScheduleRepo.js.map