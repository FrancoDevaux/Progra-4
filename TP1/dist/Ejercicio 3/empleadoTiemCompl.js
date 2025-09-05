"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoTiempoCompleto = void 0;
const empleado_abstract_1 = require("./empleado.abstract");
class EmpleadoTiempoCompleto extends empleado_abstract_1.Empleado {
    constructor(nombre, salarioBase) {
        super(nombre, salarioBase);
        this.bonoFijo = 20000;
    }
    calcularSalario() {
        return (this.salarioBase + this.bonoFijo);
    }
}
exports.EmpleadoTiempoCompleto = EmpleadoTiempoCompleto;
//# sourceMappingURL=empleadoTiemCompl.js.map