"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zorro = void 0;
const animal_abstract_1 = require("./animal.abstract");
class Zorro extends animal_abstract_1.Animal {
    constructor(nombre, especie) {
        super(nombre);
        this.especie = especie;
    }
    hacerSonido() {
        console.log(`El ${this.nombre} de la especie ${this.especie} hace: Auu`);
    }
}
exports.Zorro = Zorro;
//# sourceMappingURL=zorro.js.map