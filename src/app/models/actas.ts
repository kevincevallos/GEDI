export class Actas {
    idUsuario:number;
    codigoUsuario:string;
    titulo : string
    inicio : string
    ordenDelDia  : Orden[] = []
    desarrollo : string
    despedida : string
    codigoDocumento:string;
    fechaCodigo:string;
    InstitutoPertenciciente:string;
    logoPic:string|ArrayBuffer;
    constructor(){
        this.ordenDelDia.push(new Orden())
    }
}

export class Orden {
    orden : string
}