export abstract class Vehiculo{

    protected marca:string;
    protected modelo:string;
    protected precio:number;

    constructor(marca:string, modelo:string, precio:number){
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
    }

    getMarca():string{
        return this.marca;
    }

    getModelo():string{
        return this.modelo;
    }

    getPrecio():number{
        return this.precio;
    }

    abstract acelerar(vel:number):void;
    
}