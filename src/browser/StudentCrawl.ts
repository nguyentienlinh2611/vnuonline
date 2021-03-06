import {
    URL_DAOTAO,
    REGEX_EDUCATION_INFO,
    REGEX_PERSONAL_INFO,
    REGEX_TERM_INFO,
    URL_DAOTAO_STDINFO,
    URL_DAOTAO_SCRINFO,
    URL_DANGKYHOC, URL_DANGKYHOC_SUBINFO
} from "../common/constants";
import Student from "../entities/Student";
import Crawler from "./Crawl";
import Term from "../entities/Term";
import Score from "../entities/Score";
import Subject from "../entities/Subject";
import TermStudent from "../entities/TermStudent";
import ClassSchedule from "../entities/ClassSchedule";
import ClassSubject from "../entities/ClassSubject";
import CurrentTerm from "../controllers/TermController";
import {getRegexResult} from "../utils/RegexUtils";
import * as moment from "moment";

class StudentCrawler {
    private context;
    private readonly studentId: string;
    private readonly password: string;

    constructor(studentId, password) {
        this.studentId = studentId;
        this.password = password;
    }

    public async init() {
        try {
            this.context = await Crawler.getBrowserContext();
            await this.signIn();
        } catch (err) {
            throw err;
        }
    }

    public async signIn() {
        const page = await this.context.newPage();
        await page.goto(URL_DAOTAO);
        await page.focus('#txtLoginId');
        await page.keyboard.type(this.studentId);
        await page.focus('#txtPassword');
        await page.keyboard.type(this.password);
        await page.click('.button');
        if (page.url().includes("err")) {
            throw new Error("Login Error!");
        }
    }

    public async getScheduleInfo(student: Student) {
        const page = await this.context.newPage();
        await page.goto(URL_DANGKYHOC);
        await page.focus('input#LoginName');
        await page.keyboard.type(this.studentId);
        await page.focus('input#Password');
        await page.keyboard.type(this.password);
        await Promise.all([
            page.click('button'),
            page.waitForNavigation({waitUntil: "networkidle0"})
        ]);
        await page.goto(URL_DANGKYHOC_SUBINFO);
        let scheduleInfo = await page.evaluate(() => {
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
        var subjectsList = new Array<Subject>();
        var classSchedulesList = new Array<ClassSchedule>();
        var classSubjectsList = new Array<ClassSubject>();
        scheduleInfo.forEach((schedule) => {
            let subject = new Subject();
            let classSchedules = new Array<ClassSchedule>();
            let classSubject = new ClassSubject();
            const dayRegex = /T[2-7]|CN/g;
            const locationRegex = /[0-9]{3}T[0-9]|Phòng máy [0-9]/g;
            const sectionRegex = /([0-9]*) - ([0-9]*)/g;

            let days = getRegexResult(dayRegex, schedule.days);
            let locations = getRegexResult(locationRegex, schedule.locations);
            let sections = getRegexResult(sectionRegex, schedule.sections);

            for (let i = 0; i < days.length; i++) {
                let classSchedule = new ClassSchedule();
                classSchedule.dayOfWeek = days[i][0].trim();
                classSchedule.location = locations[i]?locations[i][0].trim():"";
                classSchedule.periodFrom = sections[i][1].trim();
                classSchedule.periodTo = sections[i][2].trim();
                classSchedule.classSubject = classSubject;
                classSchedules.push(classSchedule);
            }

            subject.id = schedule.id.trim();
            subject.creditNumber = schedule.creditNumber.trim();
            subject.subjectName = schedule.name.trim();
            classSubject.id = schedule.classSubject;
            classSubject.term = CurrentTerm.get();
            classSubject.subject = subject;
            if (classSubject.students) {
                classSubject.students.push(student);
            } else {
                let students = new Array<Student>();
                students.push(student);
                classSubject.students = students;
            }

            subjectsList.push(subject);
            classSchedulesList.push(...classSchedules);
            classSubjectsList.push(classSubject);
        });
        return {subjectsList, classSchedulesList, classSubjectsList};
    }

    async getInfo() {
        const page = await this.context.newPage();

        await page.goto(URL_DAOTAO_STDINFO);

        var {psnInfo, eduInfo} = await page.evaluate(() => {
            let table = [...document.querySelectorAll('fieldset')];
            psnInfo = table[1].innerText;
            eduInfo = table[3].innerText;
            return {psnInfo, eduInfo};
        });

        var pInfoArray;
        var eInfoArray;

        var terms = new Array<Term>();
        var termStudents = new Array<TermStudent>();
        while ((eInfoArray = REGEX_EDUCATION_INFO.exec(eduInfo)) !== null) {
            var term = new Term();
            var termStudent = new TermStudent();
            term.id = parseInt(eInfoArray[1]);
            term.termName = eInfoArray[2].trim();
            termStudent.term = term;
            termStudent.gpaScore = eInfoArray[3];
            termStudent.cumulativeScore = eInfoArray[4];
            terms.push(term);
            termStudents.push(termStudent);
        }

        await page.goto(URL_DAOTAO_SCRINFO);

        var {eduInfo, arrayObject, stdSubInfo} = await page.evaluate(() => {
            let subTable = <HTMLElement>document.querySelector('#divList1');
            let subInfo = subTable.innerText;
            let regexSub = /Lớp quản lý: ([0-9]*) ([A-Z,\s,&]*)/;
            let resultSub = regexSub.exec(subInfo);
            let stdSubInfo = {class: resultSub[1].trim(), branch: resultSub[2].trim()};
            let table = <HTMLElement>document.querySelector('#divList3');
            eduInfo = table.innerText;
            let arraySubject = [...document.querySelectorAll('img[title="Chi tiết"]')];
            let arrayObject = arraySubject.map((link: HTMLElement) => {
                let regex = /detailPoint\W*([0-9]*)\W*([0-9.]*)\W*([0-9]*)\W*([0-9]*)/;
                let result = regex.exec(link.onclick.toString());
                let subject = {subjectId: result[1].trim(), stdId: result[3].trim(), termId: result[4].trim()};
                return subject;
            });
            return {eduInfo, arrayObject, stdSubInfo};
        });

        var student = new Student();
        while ((pInfoArray = REGEX_PERSONAL_INFO.exec(psnInfo)) !== null) {
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

        var termArray = eduInfo.split(REGEX_TERM_INFO);
        termArray.shift();

        var subjects = new Array<Subject>();
        var scores = new Array<Score>();
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
                var subject = new Subject();
                var subjectObject = arrayObject[subjectCount];
                subject.id = subjectArray[j + 1].trim();
                subject.code = subjectObject.subjectId.trim();
                subject.subjectName = subjectArray[j + 2].trim();
                subject.creditNumber = subjectArray[j + 3].trim();
                subjectCount++;
                subjects.push(subject);

                var score = new Score();
                score.subject = subject;
                score.termStudent = termStudent;
                score.tpsScore = subjectArray[j + 4];
                score.fpsScore = subjectArray[j + 6];
                scores.push(score);
            }
        }
        return {student, terms, termStudents, subjects, scores};
    }
}

export default StudentCrawler;
