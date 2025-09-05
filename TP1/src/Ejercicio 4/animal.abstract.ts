export abstract class Animal{
    protected nombre:string;

    constructor(nombre:string){
        this.nombre = nombre;
    }

    //getNombre():string{
        //return this.nombre;
    //}
     
    abstract hacerSonido():void;
}