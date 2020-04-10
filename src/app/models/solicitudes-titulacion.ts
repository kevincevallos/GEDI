export class SolicitudesTitulacion{
        sumillas:string;
        destinatario:string;
        presentacionSolicitante:string;
        cuerpo:string;
        despedida:string;
        fecha:string;
        firma:string;
        listaIng:Ing[]=[];
        cedula:string
        titulacion:string
        constructor(){
            this.listaIng.push(new Ing())
    
        }
    }
    export class Ing{
            catalogo:string;
        }
