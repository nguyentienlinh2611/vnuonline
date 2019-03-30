export function getRegexResult(regex, string) {
    let r=[]; let p = []; while(p=regex.exec(string)) r.push(p);
    return r;
}
