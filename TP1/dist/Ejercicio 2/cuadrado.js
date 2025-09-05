"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cuadrado = void 0;
const figurasGeometricas_1 = require("./figurasGeometricas");
class Cuadrado extends figurasGeometricas_1.FiguraGeometrica {
    constructor(nombre, lado) {
        super(nombre);
        this.lado = lado;
    }
    calcularArea() {
        return (this.lado * this.lado);
    }
}
exports.Cuadrado = Cuadrado;
//# sourceMappingURL=cuadrado.js.map