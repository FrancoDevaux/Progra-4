export abstract class Empleado{
    public nombre:string;
    protected salarioBase:number;

    constructor(nombre:string, salarioBase:number){
        this.nombre = nombre;
        this.salarioBase = salarioBase;
    }

    getSalarioBase():number{
        return this.salarioBase;
    }
    
    abstract calcularSalario():number;
}