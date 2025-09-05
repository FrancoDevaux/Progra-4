import { Electrico } from "./electrico.interface";
import { Vehiculo } from "./vehiculo.abstract";

export class Auto extends Vehiculo implements Electrico{

    private cantidadPuertas:number;
    private electrico: boolean;
    private velocidad:number;

    constructor(marca:string, modelo:string, precio:number, cantidadPuertas:number, electrico: boolean){
        super(marca,modelo,precio);
        this.cantidadPuertas = cantidadPuertas;
        this.electrico = electrico;
        this.velocidad = 0;
    }

    getCantPuertas():number{
        return this.cantidadPuertas;
    }

    acelerar(vel:number): void {
        this.velocidad += vel;
        return console.log(`Acelerando el auto ${this.marca}:${this.modelo} a ===> ${this.velocidad} km/h`);
    }

    esElectrico(): boolean {
        return this.electrico;  // para probarlo yo mismo y no definirlo siempre a true siempre por ejemplo
    }

    cargarVehiculo(): void { 
        if(this.esElectrico()){
            console.log(`\nCargando el vehículo ${this.marca}:${this.modelo} eléctrico`);
        }else{
            console.log(`Cargando el vehículo ${this.marca}:${this.modelo} de nafta V-Power.`);
        }
    }

    
}