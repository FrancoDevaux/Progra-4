import { Animal2 } from "./Ejercicio 1/animal.interface";
import { Gato } from "./Ejercicio 1/gato";
import {Perro} from "./Ejercicio 1/perro"
//-------------------------------------------------------------------------------------------
import { Circulo } from "./Ejercicio 2/circulo";
import { Cuadrado } from "./Ejercicio 2/cuadrado";
import { FiguraGeometrica } from "./Ejercicio 2/figurasGeometricas";
import { Triangulo } from "./Ejercicio 2/triangulo";
//-------------------------------------------------------------------------------------------
import { Empleado } from "./Ejercicio 3/empleado.abstract";
import { EmpleadoTiempoCompleto } from "./Ejercicio 3/empleadoTiemCompl";
import { EmpleadoMedioTiempo } from "./Ejercicio 3/empleadoMedioTiempo";
//-------------------------------------------------------------------------------------------
import { Zorro } from "./Ejercicio 4/zorro";
import { Animal } from "./Ejercicio 4/animal.abstract";
import { Auto } from "./Ejercicio 5/auto";
import { Moto } from "./Ejercicio 5/moto";
import { Pinguino } from "./Ejercicio 4/pinguino";
import { Canario } from "./Ejercicio 4/canario";

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Ejercicio 1
console.log("\nEjercicio 1:\n");
const perro1 = new Perro();
console.log("PERRO:")
perro1.hacerSonido();
perro1.moverse();

const gato = new Gato();
console.log("\nGATO:")
gato.hacerSonido();
gato.moverse();

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Ejercicio 2
const figuras: FiguraGeometrica[] = [
    new Cuadrado("Cuadrado", 4), // (4*4 = 16)
    new Triangulo("Triángulo", 6, 6), // ((6*6)/2 = 18)
    new Circulo("Círculo", 4) // 1 parametros ya que PI lo pusimos fijo en "circulo.ts" ((3.14 * 4**2 = 50,24 )
];

console.log("\n\nEjercicio 2:\n");
for (let f of figuras) {
    console.log(`El area del ${f.getNombre()} es ---> ${f.calcularArea()}`);
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Ejercicio 3

const empleados: Empleado[] = [
    new EmpleadoTiempoCompleto("Franco", 35000), //55.000
    new EmpleadoTiempoCompleto("Eros", 1000), // 21.000
    new EmpleadoMedioTiempo("Ivo", 30000), // 15.000 
    new EmpleadoMedioTiempo("Bruno", 4000), // 2.000 

];

console.log("\n\nEjercicio 3:");
for(let i = 0; i < empleados.length; i++){
    const e = empleados[i];

    console.log(`
        Empleado: ${e.nombre}
        salario base: ${e.getSalarioBase()}
        Salario total: ${e.calcularSalario()}
    `);

}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Ejercicio 4
const animales: Animal[] = [
    new Pinguino("Pingui"),
    new Canario("Chimuelo"), 
    new Zorro("Zorro 1", "Rojo"),
    new Zorro("Zorro 2", "Bengala")
];

console.log("\n\nEjercicio 4:\n");
for (let i = 0; i < animales.length; i++) {
    animales[i].hacerSonido();

    if (animales[i] instanceof Canario || animales[i] instanceof Pinguino) {
        (animales[i] as any).volar();
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Ejercicio 5
console.log("\n\nEjercicio 5:");
const tesla = new Auto("Tesla", "Model 3", 8000000, 4, true);  
const fiat = new Auto("Fiat", "500", 500000, 2, false);

tesla.cargarVehiculo(); // Cargando el vehículo Tesla:Model 3 eléctrico
fiat.cargarVehiculo();  // Cargando el vehículo Fiat:500 de nafta V-Power

const tesla2 = new Auto("Tesla", "Cybertruck", 100000000, 4, true);
console.log(`\nEl precio de la ${tesla2.getModelo()} con ${tesla2.getCantPuertas()} puertas es de $${tesla2.getPrecio()}\n`);
tesla2.acelerar(50);  // acelera 50 km/h 
tesla2.acelerar(30);  // acelera otros 30 km/h

const yamaha = new Moto("Yamaha", "XTZ-125", 900000, false);
yamaha.getPortaEquipaje();
yamaha.acelerar(25);  // 25 km
yamaha.acelerar(10) // 25 + 10 = 35 km
yamaha.hacerCaballito(); // hace caballito a 35 km/h 