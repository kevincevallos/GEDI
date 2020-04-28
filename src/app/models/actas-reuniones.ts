export class ActasReuniones {
    idUsuario:number;
    codigoUsuario:string;
    coordinador : string
    secretaria : string
    involucrados : Docentes[]=[]
    ordenDelDia  : Orden[] = []
    revisado : string
    aprobadoUno : string
    aprobadoDos : string
    aprobadoTres : string
    aprobadoCuatro : string
    codigoDocumento:string
    fechaCodigo:string
    InstitutoPertenciciente:string
    logoPic:string|ArrayBuffer;
    constructor(){
        this.ordenDelDia.push(new Orden())
        this.involucrados.push(new Docentes())
    }
}

export class Orden {
    orden : string
    descripcion : string
}

export class Docentes {
    nombre : string
    cargo : string
}