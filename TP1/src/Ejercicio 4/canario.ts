import { Pajaro } from "./pajaro";

export class Canario extends Pajaro{

    constructor(nombre:string){
        super(nombre,"Canario");
    }


    hacerSonido(): void {
        console.log(`El ${this.nombre} hace Grr,Grr`);
    }
    volar(): void {
        console.log(`El ${this.nombre} esta volando :)`);
    }
}
    
