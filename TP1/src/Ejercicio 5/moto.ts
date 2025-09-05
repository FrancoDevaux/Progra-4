import { Vehiculo } from "./vehiculo.abstract";

export class Moto extends Vehiculo{

    private portaEquipaje:boolean;
    private velocidad:number;

    constructor(marca:string, modelo:string, precio:number, portaEquipaje:boolean){
        super(marca,modelo,precio);
        this.portaEquipaje = portaEquipaje;
        this.velocidad = 0;
    }

    getPortaEquipaje(): boolean {
        console.log(`La moto ${this.marca} ${this.portaEquipaje ? "lleva porta-equipaje" : "no lleva porta-equipaje"}`); // true : false
        return this.portaEquipaje;
    }

    acelerar(vel:number): void {
        this.velocidad += vel;
        return console.log(`Acelerando la moto ${this.marca}:${this.modelo} a ===> ${this.velocidad} km/h`);
    }

    hacerCaballito():void{
        return console.log(`La moto ${this.marca} ${this.modelo} está haciendo caballito! a una velocidad de: ${this.velocidad} Km/h`);
    }

}