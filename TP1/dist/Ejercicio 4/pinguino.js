"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pinguino = void 0;
const pajaro_1 = require("./pajaro");
class Pinguino extends pajaro_1.Pajaro {
    constructor(nombre) {
        super(nombre, "Pinguino");
    }
    hacerSonido() {
        console.log(`El ${this.nombre} hace Nug,Nug`);
    }
    volar() {
        console.log(`El ${this.nombre} no puede volar :(`);
    }
}
exports.Pinguino = Pinguino;
//# sourceMappingURL=pinguino.js.map