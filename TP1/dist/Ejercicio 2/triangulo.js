"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangulo = void 0;
const figurasGeometricas_1 = require("./figurasGeometricas");
class Triangulo extends figurasGeometricas_1.FiguraGeometrica {
    constructor(nombre, base, altura) {
        super(nombre);
        this.base = base;
        this.altura = altura;
    }
    calcularArea() {
        return (this.base * this.altura) / 2;
    }
}
exports.Triangulo = Triangulo;
//# sourceMappingURL=triangulo.js.map