import { Empleado } from "./empleado.abstract";

export class EmpleadoTiempoCompleto extends Empleado{
    
    private bonoFijo:number;

    constructor(nombre:string, salarioBase:number){
        super(nombre,salarioBase);
        this.bonoFijo = 20000;
    }
    
    calcularSalario(): number {
        return (this.salarioBase + this.bonoFijo);
    }
    
}