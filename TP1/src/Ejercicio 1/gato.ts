import { Animal2 } from "./animal.interface";

export class Gato implements Animal2{
    hacerSonido():void {
        console.log("Miau!");
    }
    moverse():void {
        console.log("Dió un paso hacia la derecha");
    }
    
}