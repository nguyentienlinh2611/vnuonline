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
const puppeteer = require("puppeteer");
class Crawler {
    static getBrowserContext() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.browser) {
                this.browser = yield puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            }
            const context = yield this.browser.createIncognitoBrowserContext();
            return context;
        });
    }
}
exports.default = Crawler;
//# sourceMappingURL=Crawl.js.map
