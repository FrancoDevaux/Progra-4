"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canario = void 0;
const pajaro_1 = require("./pajaro");
class Canario extends pajaro_1.Pajaro {
    constructor(nombre) {
        super(nombre, "Canario");
    }
    hacerSonido() {
        console.log(`El ${this.nombre} hace Grr,Grr`);
    }
    volar() {
        console.log(`El ${this.nombre} esta volando :)`);
    }
}
exports.Canario = Canario;
//# sourceMappingURL=canario.js.map