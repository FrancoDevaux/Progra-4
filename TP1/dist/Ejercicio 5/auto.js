"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
const vehiculo_abstract_1 = require("./vehiculo.abstract");
class Auto extends vehiculo_abstract_1.Vehiculo {
    constructor(marca, modelo, precio, cantidadPuertas, electrico) {
        super(marca, modelo, precio);
        this.cantidadPuertas = cantidadPuertas;
        this.electrico = electrico;
        this.velocidad = 0;
    }
    getCantPuertas() {
        return this.cantidadPuertas;
    }
    acelerar(vel) {
        this.velocidad += vel;
        return console.log(`Acelerando el auto ${this.marca}:${this.modelo} a ===> ${this.velocidad} km/h`);
    }
    esElectrico() {
        return this.electrico; // para probarlo yo mismo y no definirlo siempre a true siempre por ejemplo
    }
    cargarVehiculo() {
        if (this.esElectrico()) {
            console.log(`\nCargando el vehículo ${this.marca}:${this.modelo} eléctrico`);
        }
        else {
            console.log(`Cargando el vehículo ${this.marca}:${this.modelo} de nafta V-Power.`);
        }
    }
}
exports.Auto = Auto;
//# sourceMappingURL=auto.js.map