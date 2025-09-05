import { Animal } from "./animal.abstract";

export class Zorro extends Animal{
    
    private especie: string;

    constructor(nombre:string, especie:string){
        super(nombre);
        this.especie = especie;
    }


    hacerSonido(): void {
        console.log(`El ${this.nombre} de la especie ${this.especie} hace: Auu`);
    }
}