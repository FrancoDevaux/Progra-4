export abstract class FiguraGeometrica{
    protected nombre:string;

    constructor(nombre:string){
        this.nombre = nombre;
    }

    // para acceder al nombre
    getNombre():string{
        return this.nombre;
    }

    abstract calcularArea():number;
}