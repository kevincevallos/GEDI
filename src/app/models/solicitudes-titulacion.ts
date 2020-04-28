export class SolicitudesTitulacion{
        idUsuario:number;
        codigoUsuario:string;
        sumillas:string;
        codigoDocumento:string;
        destinatario:string;
        presentacionSolicitante:string;
        cuerpo:string;
        despedida:string;
        fecha:string;
        firma:string;
        listaIng:Ing[]=[];
        cedula:string
        titulacion:string
        fechaCodigo:string;
        InstitutoPertenciciente:string
        logoPic:string|ArrayBuffer
        constructor(){
            this.listaIng.push(new Ing())
    
        }
    }
    export class Ing{
            catalogo:string;
        }
