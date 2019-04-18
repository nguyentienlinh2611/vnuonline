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
const TermStudent_1 = require("../entities/TermStudent");
const ClassSchedule_1 = require("../entities/ClassSchedule");
const ClassSubject_1 = require("../entities/ClassSubject");
const TermController_1 = require("../controllers/TermController");
const RegexUtils_1 = require("../utils/RegexUtils");
const moment = require("moment");
class StudentCrawler {
    constructor(studentId, password) {
        this.studentId = studentId;
        this.password = password;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.context = yield Crawl_1.default.getBrowserContext();
                yield this.signIn();
            }
            catch (err) {
                throw err;
            }
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
            if (page.url().includes("err")) {
                throw new Error("Login Error!");
            }
        });
    }
    getScheduleInfo(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.context.newPage();
            yield page.goto(constants_1.URL_DANGKYHOC);
            yield page.focus('input#LoginName');
            yield page.keyboard.type(this.studentId);
            yield page.focus('input#Password');
            yield page.keyboard.type(this.password);
            yield Promise.all([
                page.click('button'),
                page.waitForNavigation({ waitUntil: "networkidle0" })
            ]);
            yield page.goto(constants_1.URL_DANGKYHOC_SUBINFO);
            let scheduleInfo = yield page.evaluate(() => {
                let subjectsList = [];
                let table = [...document.querySelectorAll('table')];
                let rowsList = table[2].querySelectorAll('tr');
                for (let rowIndex = 1; rowIndex < rowsList.length - 1; rowIndex++) {
                    let subjectHtml = rowsList[rowIndex].cells;
                    let subject = {
                        id: "",
                        name: "",
                        creditNumber: "",
                        classSubject: "",
                        days: "",
                        sections: "",
                        locations: ""
                    };
                    subject.id = subjectHtml[1].innerText.trim();
                    subject.name = subjectHtml[2].innerText.trim();
                    subject.creditNumber = subjectHtml[3].innerText.trim();
                    subject.classSubject = subjectHtml[6].innerText.trim();
                    subject.days = subjectHtml[7].innerText.trim();
                    subject.sections = subjectHtml[8].innerText.trim();
                    subject.locations = subjectHtml[9].innerText.trim();
                    subjectsList.push(subject);
                }
                return subjectsList;
            });
            var subjectsList = new Array();
            var classSchedulesList = new Array();
            var classSubjectsList = new Array();
            scheduleInfo.forEach((schedule) => {
                let subject = new Subject_1.default();
                let classSchedules = new Array();
                let classSubject = new ClassSubject_1.default();
                const dayRegex = /T[2-7]|CN/g;
                const locationRegex = /[0-9]{3}T[0-9]|Phòng máy [0-9]/g;
                const sectionRegex = /([0-9]*) - ([0-9]*)/g;
                let days = RegexUtils_1.getRegexResult(dayRegex, schedule.days);
                let locations = RegexUtils_1.getRegexResult(locationRegex, schedule.locations);
                let sections = RegexUtils_1.getRegexResult(sectionRegex, schedule.sections);
                for (let i = 0; i < days.length; i++) {
                    let classSchedule = new ClassSchedule_1.default();
                    classSchedule.dayOfWeek = days[i][0].trim();
                    classSchedule.location = locations[i] ? locations[i][0].trim() : "";
                    classSchedule.periodFrom = sections[i][1].trim();
                    classSchedule.periodTo = sections[i][2].trim();
                    classSchedule.classSubject = classSubject;
                    classSchedules.push(classSchedule);
                }
                subject.id = schedule.id.trim();
                subject.creditNumber = schedule.creditNumber.trim();
                subject.subjectName = schedule.name.trim();
                classSubject.id = schedule.classSubject;
                classSubject.term = TermController_1.default.get();
                classSubject.subject = subject;
                if (classSubject.students) {
                    classSubject.students.push(student);
                }
                else {
                    let students = new Array();
                    students.push(student);
                    classSubject.students = students;
                }
                subjectsList.push(subject);
                classSchedulesList.push(...classSchedules);
                classSubjectsList.push(classSubject);
            });
            return { subjectsList, classSchedulesList, classSubjectsList };
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
            var terms = new Array();
            var termStudents = new Array();
            while ((eInfoArray = constants_1.REGEX_EDUCATION_INFO.exec(eduInfo)) !== null) {
                var term = new Term_1.default();
                var termStudent = new TermStudent_1.default();
                term.id = parseInt(eInfoArray[1]);
                term.termName = eInfoArray[2].trim();
                termStudent.term = term;
                termStudent.gpaScore = eInfoArray[3];
                termStudent.cumulativeScore = eInfoArray[4];
                terms.push(term);
                termStudents.push(termStudent);
            }
            yield page.goto(constants_1.URL_DAOTAO_SCRINFO);
            var { eduInfo, arrayObject, stdSubInfo } = yield page.evaluate(() => {
                let subTable = document.querySelector('#divList1');
                let subInfo = subTable.innerText;
                let regexSub = /Lớp quản lý: ([0-9]*) ([A-Z,\s,&]*)/;
                let resultSub = regexSub.exec(subInfo);
                let stdSubInfo = { class: resultSub[1].trim(), branch: resultSub[2].trim() };
                let table = document.querySelector('#divList3');
                eduInfo = table.innerText;
                let arraySubject = [...document.querySelectorAll('img[title="Chi tiết"]')];
                let arrayObject = arraySubject.map((link) => {
                    let regex = /detailPoint\W*([0-9]*)\W*([0-9.]*)\W*([0-9]*)\W*([0-9]*)/;
                    let result = regex.exec(link.onclick.toString());
                    let subject = { subjectId: result[1].trim(), stdId: result[3].trim(), termId: result[4].trim() };
                    return subject;
                });
                return { eduInfo, arrayObject, stdSubInfo };
            });
            var student = new Student_1.default();
            while ((pInfoArray = constants_1.REGEX_PERSONAL_INFO.exec(psnInfo)) !== null) {
                student.id = arrayObject[0].stdId;
                student.displayId = parseInt(pInfoArray[1]);
                student.fullName = pInfoArray[2].trim();
                student.gender = pInfoArray[3].trim();
                student.country = pInfoArray[5].trim();
                student.hometown = pInfoArray[6].trim();
                student.address = pInfoArray[7].trim();
                student.phone = pInfoArray[8].trim();
                student.email = pInfoArray[9].trim();
                student.birthday = moment(pInfoArray[4], "DD-MM-YYYY").toDate();
                student.branch = stdSubInfo.branch;
                student.class = stdSubInfo.class;
            }
            var termArray = eduInfo.split(constants_1.REGEX_TERM_INFO);
            termArray.shift();
            var subjects = new Array();
            var scores = new Array();
            var termCount = 0;
            var subjectCount = 0;
            for (var i = 0; i < termArray.length; i += 3) {
                var termStudent = termStudents[termStudents.length - 1 - termCount];
                termStudent.student = student;
                termCount++;
                var subjectArray = termArray[i + 2].split(/\t\s*/);
                subjectArray.shift();
                subjectArray.pop();
                for (var j = 0; j < subjectArray.length; j += 7) {
                    var subject = new Subject_1.default();
                    var subjectObject = arrayObject[subjectCount];
                    subject.id = subjectArray[j + 1].trim();
                    subject.code = subjectObject.subjectId.trim();
                    subject.subjectName = subjectArray[j + 2].trim();
                    subject.creditNumber = subjectArray[j + 3].trim();
                    subjectCount++;
                    subjects.push(subject);
                    var score = new Score_1.default();
                    score.subject = subject;
                    score.termStudent = termStudent;
                    score.tpsScore = subjectArray[j + 4];
                    score.fpsScore = subjectArray[j + 6];
                    scores.push(score);
                }
            }
            return { student, terms, termStudents, subjects, scores };
        });
    }
}
exports.default = StudentCrawler;
//# sourceMappingURL=StudentCrawl.js.map