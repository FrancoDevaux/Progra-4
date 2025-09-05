import { Pajaro } from "./pajaro";

export class Pinguino extends Pajaro{


    constructor(nombre:string){
        super(nombre,"Pinguino");
    }

    hacerSonido(): void {
        console.log(`El ${this.nombre} hace Nug,Nug`);
    }
    volar(): void {
        console.log(`El ${this.nombre} no puede volar :(`);
    }
}