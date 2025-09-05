import { FiguraGeometrica } from "./figurasGeometricas";

export class Triangulo extends FiguraGeometrica{

    private base:number;
    private altura:number;

    constructor(nombre:string, base:number, altura:number){
        super(nombre);
        this.base = base;
        this.altura = altura;
    }

    calcularArea(): number {
        return (this.base * this.altura) / 2;
    }
}