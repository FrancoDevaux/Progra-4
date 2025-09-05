import { FiguraGeometrica } from "./figurasGeometricas";

export class Cuadrado extends FiguraGeometrica{

    private lado:number;

    constructor(nombre:string, lado:number){
        super(nombre);
        this.lado = lado;
    }

    calcularArea(): number {
        return (this.lado * this.lado);
    }
}