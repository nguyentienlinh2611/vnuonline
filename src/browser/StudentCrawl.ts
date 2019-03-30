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
                subject.id = subjectHtml[1].innerText;
                subject.name = subjectHtml[2].innerText;
                subject.creditNumber = subjectHtml[3].innerText;
                subject.classSubject = subjectHtml[6].innerText;
                subject.days = subjectHtml[7].innerText;
                subject.sections = subjectHtml[8].innerText;
                subject.locations = subjectHtml[9].innerText;
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
                classSchedule.dayOfWeek = days[i][0];
                classSchedule.location = locations[i]?locations[i][0]:"";
                classSchedule.periodFrom = sections[i][1];
                classSchedule.periodTo = sections[i][2];
                classSchedule.classSubject = classSubject;
                classSchedules.push(classSchedule);
            }

            subject.id = schedule.id;
            subject.creditNumber = schedule.creditNumber;
            subject.subjectName = schedule.name;
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
            term.termName = eInfoArray[2];
            termStudent.term = term;
            termStudent.gpaScore = eInfoArray[3];
            termStudent.cumulativeScore = eInfoArray[4];
            terms.push(term);
            termStudents.push(termStudent);
        }

        await page.goto(URL_DAOTAO_SCRINFO);

        var {eduInfo, arrayObject} = await page.evaluate(() => {
            let table = <HTMLElement>document.querySelector('#divList3');
            eduInfo = table.innerText;
            var arraySubject = [...document.querySelectorAll('img[title="Chi tiết"]')];
            var arrayObject = arraySubject.map((link: HTMLElement) => {
                var regex = /detailPoint\W*([0-9]*)\W*([0-9.]*)\W*([0-9]*)\W*([0-9]*)/;
                var result = regex.exec(link.onclick.toString());
                var subject = {subjectId: result[1], stdId: result[3], termId: result[4]};
                return subject;
            });
            return {eduInfo, arrayObject};
        });

        var student = new Student();
        while ((pInfoArray = REGEX_PERSONAL_INFO.exec(psnInfo)) !== null) {
            student.id = arrayObject[0].stdId;
            student.displayId = parseInt(pInfoArray[1]);
            student.fullName = pInfoArray[2];
            student.gender = pInfoArray[3];
            student.country = pInfoArray[5];
            student.hometown = pInfoArray[6];
            student.address = pInfoArray[7];
            student.phone = pInfoArray[8];
            student.email = pInfoArray[9];
            student.birthday = moment(pInfoArray[4], "DD-MM-YYYY").toDate();
            // student.branch = "MT&KHTT";
            // student.class = 60;
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
                subject.id = subjectArray[j + 1];
                subject.code = subjectObject.subjectId;
                subject.subjectName = subjectArray[j + 2];
                subject.creditNumber = subjectArray[j + 3];
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
