"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../common/constants");
const Student_1 = require("../entities/Student");
const Crawl_1 = require("./Crawl");
const Term_1 = require("../entities/Term");
const Score_1 = require("../entities/Score");
const Subject_1 = require("../entities/Subject");
class StudentCrawler {
    constructor(studentId, password) {
        this.studentId = studentId;
        this.password = password;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.context = yield Crawl_1.default.getBrowserContext();
            yield this.signIn();
        });
    }
    signIn() {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.context.newPage();
            yield page.goto(constants_1.URL_DAOTAO);
            yield page.focus('#txtLoginId');
            yield page.keyboard.type(this.studentId);
            yield page.focus('#txtPassword');
            yield page.keyboard.type(this.password);
            yield page.click('.button');
            var countResponse = 0;
            page.on('response', (response) => __awaiter(this, void 0, void 0, function* () {
                countResponse++;
                if (countResponse === 2) {
                    if (response.url().includes("err")) {
                        throw Error("Login Error!");
                    }
                }
            }));
        });
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.context.newPage();
            yield page.goto(constants_1.URL_DAOTAO_STDINFO);
            var { psnInfo, eduInfo } = yield page.evaluate(() => {
                let table = [...document.querySelectorAll('fieldset')];
                psnInfo = table[1].innerText;
                eduInfo = table[3].innerText;
                return { psnInfo, eduInfo };
            });
            var pInfoArray;
            var eInfoArray;
            var termsArray = new Array();
            while ((eInfoArray = constants_1.REGEX_EDUCATION_INFO.exec(eduInfo)) !== null) {
                var term = new Term_1.default();
                term.displayId = parseInt(eInfoArray[1]);
                term.termName = eInfoArray[2];
                term.gpaScore = eInfoArray[3];
                term.cumulativeScore = eInfoArray[4];
                termsArray.push(term);
            }
            yield page.goto(constants_1.URL_DAOTAO_SCRINFO);
            var { eduInfo, arrayObject } = yield page.evaluate(() => {
                let table = document.querySelector('#divList3');
                eduInfo = table.innerText;
                var arraySubject = [...document.querySelectorAll('img[title="Chi tiết"]')];
                var arrayObject = arraySubject.map((link) => {
                    var regex = /detailPoint\W*([0-9]*)\W*([0-9.]*)\W*([0-9]*)\W*([0-9]*)/;
                    var result = regex.exec(link.onclick.toString());
                    var subject = { subjectId: result[1], stdId: result[3], termId: result[4] };
                    return subject;
                });
                return { eduInfo, arrayObject };
            });
            var student = new Student_1.default();
            while ((pInfoArray = constants_1.REGEX_PERSONAL_INFO.exec(psnInfo)) !== null) {
                student.studentId = arrayObject[0].stdId;
                student.displayId = parseInt(pInfoArray[1]);
                student.fullName = pInfoArray[2];
                student.gender = pInfoArray[3];
                student.country = pInfoArray[5];
                student.hometown = pInfoArray[6];
                student.address = pInfoArray[7];
                student.phone = pInfoArray[8];
                student.email = pInfoArray[9];
                student.birthday = new Date();
                student.branch = "MT&KHTT";
                student.class = 60;
            }
            var termArray = eduInfo.split(constants_1.REGEX_TERM_INFO);
            termArray.shift();
            var terms = new Array();
            var subjects = new Array();
            var scores = new Array();
            var count = 0;
            for (var i = 0; i < termArray.length; i += 3) {
                var term = new Term_1.default();
                term.student = student;
                term.displayId = parseInt(termArray[i + 1]);
                term.termName = termArray[i];
                var subjectArray = termArray[i + 2].split(/\t\s*/);
                subjectArray.shift();
                subjectArray.pop();
                for (var j = 0; j < subjectArray.length; j += 7) {
                    var subject = new Subject_1.default();
                    var subjectObject = arrayObject[count];
                    term.termId = subjectObject.termId;
                    subject.subjectId = subjectObject.subjectId;
                    subject.displayId = subjectArray[j + 1];
                    subject.subjectName = subjectArray[j + 2];
                    subject.creditNumber = subjectArray[j + 3];
                    count++;
                    subjects.push(subject);
                    var score = new Score_1.default();
                    score.subject = subject;
                    score.term = term;
                    score.tpsScore = subjectArray[j + 4];
                    score.fpsScore = subjectArray[j + 6];
                    scores.push(score);
                }
                terms.push(term);
            }
            terms.forEach((term1) => {
                termsArray.forEach((term2) => {
                    if (term1.displayId === term2.displayId) {
                        term1.cumulativeScore = term2.cumulativeScore;
                        term1.gpaScore = term2.gpaScore;
                    }
                });
            });
            return { student, terms, subjects, scores };
        });
    }
}
exports.default = StudentCrawler;
//# sourceMappingURL=StudentCrawl.js.map