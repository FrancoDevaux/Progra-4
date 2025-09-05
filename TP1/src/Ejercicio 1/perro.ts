import { Animal2 } from "./animal.interface";

export class Perro implements Animal2{
    hacerSonido():void {
        console.log("Guag!");
    }
    moverse():void {
        console.log("El perro corre");
    }
}