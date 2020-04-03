export class Actas {
    titulo : string
    inicio : string
    ordenDelDia  : Orden[] = []
    desarrollo : string
    despedida : string

    constructor(){
        this.ordenDelDia.push(new Orden())
    }
}

export class Orden {
    orden : string
}