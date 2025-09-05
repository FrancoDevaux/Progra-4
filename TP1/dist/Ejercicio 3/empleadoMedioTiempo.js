"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoMedioTiempo = void 0;
const empleado_abstract_1 = require("./empleado.abstract");
class EmpleadoMedioTiempo extends empleado_abstract_1.Empleado {
    constructor(nombre, salarioBase) {
        super(nombre, salarioBase);
        this.porcentaje = 0.5;
    }
    calcularSalario() {
        return (this.salarioBase * this.porcentaje);
    }
}
exports.EmpleadoMedioTiempo = EmpleadoMedioTiempo;
//# sourceMappingURL=empleadoMedioTiempo.js.map