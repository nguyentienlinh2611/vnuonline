import { URL_DAOTAO, REGEX_EDUCATION_INFO, REGEX_PERSONAL_INFO } from "../common/constants";
import Student from "../entities/Student";
import Crawler from "./Crawl";
import Term from "../entities/Term";
import Score from "../entities/Score";
import Subject from "../entities/Subject";

class StudentCrawler {
    private context;
    private studentId: string;
    private password: string;

    constructor(studentId, password) {
        this.studentId = studentId;
        this.password = password;
    }

    public async init() {
        this.context = await Crawler.getBrowserContext();
        await this.signIn();
    }

    public async signIn() {
        const page = await this.context.newPage();
        await page.goto(URL_DAOTAO);
        await page.focus('#txtLoginId');
        await page.keyboard.type(this.studentId);
        await page.focus('#txtPassword');
        await page.keyboard.type(this.password);
        await page.click('.button');
        var countResponse = 0;
        page.on('response', async response => {
            countResponse++;
            if (countResponse === 2) {
                if (response.url().includes("err")) {
                    throw Error("Login Error!");
                }
            }
        });
    }

    async getInfo() {
        const page = await this.context.newPage();

        await page.goto('https://daotao.vnu.edu.vn/StdInfo/TabStdInfo.asp');

        var { psnInfo, eduInfo } = await page.evaluate(() => {
            let table = [...document.querySelectorAll('fieldset')];
            psnInfo = table[1].innerText;
            eduInfo = table[3].innerText;
            return { psnInfo, eduInfo };
        });

        var pInfoArray;
        var eInfoArray;

        var termsArray = new Array<Term>();
        while ((eInfoArray = REGEX_EDUCATION_INFO.exec(eduInfo)) !== null) {
            var term = new Term();
            term.displayId = parseInt(eInfoArray[1]);
            term.termName = eInfoArray[2];
            term.gpaScore = eInfoArray[3];
            term.cumulativeScore = eInfoArray[4];
            termsArray.push(term);
        }

        await page.goto('https://daotao.vnu.edu.vn/ListPoint/listpoint_Brc1.asp');

        var { eduInfo, arrayObject } = await page.evaluate(() => {
            let table = <HTMLElement>document.querySelector('#divList3');
            eduInfo = table.innerText;
            var arraySubject = [...document.querySelectorAll('img[title="Chi tiết"]')];
            var arrayObject = arraySubject.map((link: HTMLElement) => {
                var regex = /detailPoint\W*([0-9]*)\W*([0-9.]*)\W*([0-9]*)\W*([0-9]*)/
                var result = regex.exec(link.onclick.toString());
                var subject = { subjectId: result[1], stdId: result[3], termId: result[4] };
                return subject;
            });
            return { eduInfo, arrayObject };
        });

        var student = new Student();
        while((pInfoArray = REGEX_PERSONAL_INFO.exec(psnInfo)) !== null){
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

        var termArray = eduInfo.split(/(HỌC KỲ .*) MÃ HỌC KỲ ([0-9]*)/);
        termArray.shift();

        var terms = new Array<Term>();
        for (var i = 0; i < termArray.length; i += 3) {
            var subjectObject = arrayObject[i / 3];
            var term = new Term();
            term.termId = subjectObject.termId;
            term.student = student;
            term.displayId = parseInt(termArray[i + 1]);
            term.termName = termArray[i];
            terms.push(term);

            var subjectArray = termArray[i + 2].split(/\t\s*/);
            subjectArray.shift();
            subjectArray.pop();

            var subjects = new Array<Subject>();
            var scores = new Array<Score>();
            for (var j = 0; j < subjectArray.length; j += 7) {
                var subject = new Subject();
                subject.subjectId = subjectObject.subjectId;
                subject.displayId = subjectArray[i + 1];
                subject.subjectName = subjectArray[i + 2];
                subject.creditNumber = subjectArray[i + 3];
                subjects.push(subject);

                var score = new Score();
                score.subject = subject;
                score.termId = term.aiid;
                score.tpsScore = subjectArray[i + 4];
                score.fpsScore = subjectArray[i + 6];
                scores.push(score);
            }
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
    }
}

export default StudentCrawler;