export class Oficios {
    idUsuario:number;
    codigoUsuario:string;
    fecha:string;
    lugar:string;
    numeroOficio:string;
    destinatario:string;
    asunto:string;
    cuerpo:string;
    despedida:string;
    firma:string;
    ordenDelDia:Ordenado[]=[];
    fechaCodigo:string
    InstitutoPertenciciente:string;
    codigoDocumento:string
    logoPic:string|ArrayBuffer
    constructor(){
        this.ordenDelDia.push( new Ordenado())
    }
}
export class Ordenado{
    catalogo:string;
}