import { Animal } from "./animal.abstract";
import { Volador } from "./volador.interface";

export abstract class Pajaro extends Animal implements Volador{

    private especie:string;

    constructor(nombre:string, especie:string){
        super(nombre);
        this.especie = especie;
    }

    abstract hacerSonido(): void;
    abstract volar(): void;
}