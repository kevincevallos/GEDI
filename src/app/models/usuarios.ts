export class Usuarios {
    codigoUser: string
    primerNombre: string
    segundoNombre: string
    primerApellido: string
    segundoApellido: string
    idRol: number
    correo: string
    clave: string
    fechaRegistro: string

    constructor(codigoUser: string, primerNombre: string, segundoNombre: string,
        primerApellido: string, segundoApellido: string,
        correo: string, clave: string, fechaRegistro: string) {

        this.codigoUser = codigoUser
        this.primerNombre = primerNombre
        this.segundoNombre = segundoNombre
        this.primerApellido = primerApellido
        this.segundoApellido = segundoApellido
        this.correo = correo
        this.clave = clave
        this.fechaRegistro = fechaRegistro
    }



}