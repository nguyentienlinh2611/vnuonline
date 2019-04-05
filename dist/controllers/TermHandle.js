"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Term_1 = require("../entities/Term");
const TermRepo_1 = require("../repositories/TermRepo");
class CurrentTerm {
    static get() {
        var currentTerm = this.currentTerm;
        if (!currentTerm) {
            const termRepo = new TermRepo_1.default();
            currentTerm = new Term_1.default();
            currentTerm.id = 182;
            currentTerm.termName = "HK 2 - NH 2018-2019";
            this.currentTerm = currentTerm;
            termRepo.save(currentTerm);
        }
        return currentTerm;
    }
}
exports.default = CurrentTerm;
//# sourceMappingURL=TermHandle.js.map