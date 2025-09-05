"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moto = void 0;
const vehiculo_abstract_1 = require("./vehiculo.abstract");
class Moto extends vehiculo_abstract_1.Vehiculo {
    constructor(marca, modelo, precio, portaEquipaje) {
        super(marca, modelo, precio);
        this.portaEquipaje = portaEquipaje;
        this.velocidad = 0;
    }
    getPortaEquipaje() {
        console.log(`La moto ${this.marca} ${this.portaEquipaje ? "lleva porta-equipaje" : "no lleva porta-equipaje"}`); // true : false
        return this.portaEquipaje;
    }
    acelerar(vel) {
        this.velocidad += vel;
        return console.log(`Acelerando la moto ${this.marca}:${this.modelo} a ===> ${this.velocidad} km/h`);
    }
    hacerCaballito() {
        return console.log(`La moto ${this.marca} ${this.modelo} está haciendo caballito! a una velocidad de: ${this.velocidad} Km/h`);
    }
}
exports.Moto = Moto;
//# sourceMappingURL=moto.js.map