"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRegexResult(regex, string) {
    let r = [];
    let p = [];
    while (p = regex.exec(string))
        r.push(p);
    return r;
}
exports.getRegexResult = getRegexResult;
//# sourceMappingURL=RegexUtils.js.map