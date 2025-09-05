import { FiguraGeometrica } from "./figurasGeometricas";

export class Circulo extends FiguraGeometrica{

    private pi:number;
    private radio:number;

    constructor(nombre:string, radio:number){
        super(nombre);
        this.pi = 3.14;
        this.radio = radio;
    }

    calcularArea(): number {
        return (this.pi * this.radio**2);
    }

}