"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circulo = void 0;
const figurasGeometricas_1 = require("./figurasGeometricas");
class Circulo extends figurasGeometricas_1.FiguraGeometrica {
    constructor(nombre, radio) {
        super(nombre);
        this.pi = 3.14;
        this.radio = radio;
    }
    calcularArea() {
        return (this.pi * this.radio ** 2);
    }
}
exports.Circulo = Circulo;
//# sourceMappingURL=circulo.js.map