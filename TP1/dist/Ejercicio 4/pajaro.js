"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pajaro = void 0;
const animal_abstract_1 = require("./animal.abstract");
class Pajaro extends animal_abstract_1.Animal {
    constructor(nombre, especie) {
        super(nombre);
        this.especie = especie;
    }
}
exports.Pajaro = Pajaro;
//# sourceMappingURL=pajaro.js.map