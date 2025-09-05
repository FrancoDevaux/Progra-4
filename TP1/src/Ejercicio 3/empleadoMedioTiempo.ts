import { Empleado } from "./empleado.abstract";

export class EmpleadoMedioTiempo extends Empleado{
    
    private porcentaje:number;
    
    constructor(nombre:string, salarioBase:number){
        super(nombre, salarioBase)
        this.porcentaje = 0.5
    }
    
    calcularSalario(): number {
        return (this.salarioBase * this.porcentaje);
    }
    
}