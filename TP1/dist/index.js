"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gato_1 = require("./Ejercicio 1/gato");
const perro_1 = require("./Ejercicio 1/perro");
//-------------------------------------------------------------------------------------------
const circulo_1 = require("./Ejercicio 2/circulo");
const cuadrado_1 = require("./Ejercicio 2/cuadrado");
const triangulo_1 = require("./Ejercicio 2/triangulo");
const empleadoTiemCompl_1 = require("./Ejercicio 3/empleadoTiemCompl");
const empleadoMedioTiempo_1 = require("./Ejercicio 3/empleadoMedioTiempo");
//-------------------------------------------------------------------------------------------
const zorro_1 = require("./Ejercicio 4/zorro");
const auto_1 = require("./Ejercicio 5/auto");
const moto_1 = require("./Ejercicio 5/moto");
const pinguino_1 = require("./Ejercicio 4/pinguino");
const canario_1 = require("./Ejercicio 4/canario");
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Ejercicio 1
console.log("\nEjercicio 1:\n");
const perro1 = new perro_1.Perro();
console.log("PERRO:");
perro1.hacerSonido();
perro1.moverse();
const gato = new gato_1.Gato();
console.log("\nGATO:");
gato.hacerSonido();
gato.moverse();
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Ejercicio 2
const figuras = [
    new cuadrado_1.Cuadrado("Cuadrado", 4), // (4*4 = 16)
    new triangulo_1.Triangulo("Triángulo", 6, 6), // ((6*6)/2 = 18)
    new circulo_1.Circulo("Círculo", 4) // 1 parametros ya que PI lo pusimos fijo en "circulo.ts" ((3.14 * 4**2 = 50,24 )
];
console.log("\n\nEjercicio 2:\n");
for (let f of figuras) {
    console.log(`El area del ${f.getNombre()} es ---> ${f.calcularArea()}`);
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Ejercicio 3
const empleados = [
    new empleadoTiemCompl_1.EmpleadoTiempoCompleto("Franco", 35000), //55.000
    new empleadoTiemCompl_1.EmpleadoTiempoCompleto("Eros", 1000), // 21.000
    new empleadoMedioTiempo_1.EmpleadoMedioTiempo("Ivo", 30000), // 15.000 
    new empleadoMedioTiempo_1.EmpleadoMedioTiempo("Bruno", 4000), // 2.000 
];
console.log("\n\nEjercicio 3:");
for (let i = 0; i < empleados.length; i++) {
    const e = empleados[i];
    console.log(`
        Empleado: ${e.nombre}
        salario base: ${e.getSalarioBase()}
        Salario total: ${e.calcularSalario()}
    `);
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Ejercicio 4
const animales = [
    new pinguino_1.Pinguino("Pingui"),
    new canario_1.Canario("Chimuelo"),
    new zorro_1.Zorro("Zorro 1", "Rojo"),
    new zorro_1.Zorro("Zorro 2", "Bengala")
];
console.log("\n\nEjercicio 4:\n");
for (let i = 0; i < animales.length; i++) {
    animales[i].hacerSonido();
    if (animales[i] instanceof canario_1.Canario || animales[i] instanceof pinguino_1.Pinguino) {
        animales[i].volar();
    }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Ejercicio 5
console.log("\n\nEjercicio 5:");
const tesla = new auto_1.Auto("Tesla", "Model 3", 8000000, 4, true);
const fiat = new auto_1.Auto("Fiat", "500", 500000, 2, false);
tesla.cargarVehiculo(); // Cargando el vehículo Tesla:Model 3 eléctrico
fiat.cargarVehiculo(); // Cargando el vehículo Fiat:500 de nafta V-Power
const tesla2 = new auto_1.Auto("Tesla", "Cybertruck", 100000000, 4, true);
console.log(`\nEl precio de la ${tesla2.getModelo()} con ${tesla2.getCantPuertas()} puertas es de $${tesla2.getPrecio()}\n`);
tesla2.acelerar(50); // acelera 50 km/h 
tesla2.acelerar(30); // acelera otros 30 km/h
const yamaha = new moto_1.Moto("Yamaha", "XTZ-125", 900000, false);
yamaha.getPortaEquipaje();
yamaha.acelerar(25); // 25 km
yamaha.acelerar(10); // 25 + 10 = 35 km
yamaha.hacerCaballito(); // hace caballito a 35 km/h 
//# sourceMappingURL=index.js.map