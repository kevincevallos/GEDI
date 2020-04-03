import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from '../models/usuarios';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ServicioService } from '../servicio.service';
import { Roles } from '../models/roles';
import { DatePipe } from '@angular/common'
import { parseTemplate } from '@angular/compiler';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formRegistration: any;
  registerForm: FormGroup;
  usuario: Usuarios;
  rol: Roles;
  visibilidadPCedula: boolean;
  visibilidadPCorreo: boolean;
  listaUsuarios = [];
  url: string;
  date: any;
  listaRoles = [];
  listaCargos = [{id:1,cargo:'Docente',estado:true},
                 {id:2,cargo:'Coordinador',estado:true},
                 {id:3,cargo:'Rector',estado:true}];
  listaInstitutos = [];
  listaCarreras = [];
  tipoSeleccionado: any=0;
  codigo_usuario:string;
  insti:boolean;
  carr:boolean;
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private service: ServicioService,
    public datepipe: DatePipe) { }

  ngOnInit() {
    this.obtenerFecha();
    this.insti=false;
    this.carr=false;
    console.log(this.date); //output : 2018-02-13
    this.url = 'http://localhost:3000/server'
    this.visibilidadPCedula = false
    this.visibilidadPCorreo = false
    this.formRegistration = this.formBuilder.group({
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      correo: '',
      clave: '',
      fechaRegistro: '',
      instituto: '',
      carrera: '',
      cargo: ''
    });
    //this.formRegistration.fechaRegistro=this.date;

    this.service.getUsers().subscribe(
      (getdatos: any[]) => this.listaUsuarios = getdatos,
      (error: HttpErrorResponse) => { console.log(error.message) },
      () => console.log('getUsers() Finalizado', this.listaUsuarios))

    this.service.getInstitutos().subscribe(
      (getdatos: any[]) => this.listaInstitutos = getdatos,
      (error: HttpErrorResponse) => { console.log(error.message) },
      () => console.log('getInstitutos() Finalizado', this.listaInstitutos))

    this.service.getCarreras().subscribe(
      (getdatos: any[]) => this.listaCarreras = getdatos,
      (error: HttpErrorResponse) => { console.log(error.message) },
      () => console.log('getCarreras() Finalizado', this.listaCarreras))

      console.log('getCargos() Finalizado', this.listaCargos)

  }

  instituto(e) {
    console.log(parseInt(e.target.value));
    this.tipoSeleccionado = parseInt(e.target.value);
    //console.log('valor_:',this.tipoSeleccionado);

    if (this.tipoSeleccionado>0) {
      this.insti=true;
    }

     if (this.tipoSeleccionado==1) {
      this.codigo_usuario='YAV';
      console.log('ejemplo_:',this.codigo_usuario)
    }

    if (this.tipoSeleccionado==2) {
      this.codigo_usuario='GRC';
      console.log('ejemplo_:',this.codigo_usuario)

    }
    if (this.tipoSeleccionado==3) {
      this.codigo_usuario='BJ';
      console.log('ejemplo_:',this.codigo_usuario)

    }
  }

  carrera(e) {
    console.log(parseInt(e.target.value));
    this.tipoSeleccionado = parseInt(e.target.value);
    //console.log('valor_:',this.tipoSeleccionado);
    if (this.tipoSeleccionado>0) {
      this.carr=true;
    }
     if (this.tipoSeleccionado==1) {
      this.codigo_usuario=this.codigo_usuario+'MKT';
      console.log('ejemplo_:',this.codigo_usuario)
    } 
    if (this.tipoSeleccionado==2) {
      this.codigo_usuario=this.codigo_usuario+'GNT';
      console.log('ejemplo_:',this.codigo_usuario)
    } 
    if (this.tipoSeleccionado==3) {
      this.codigo_usuario=this.codigo_usuario+'ACE';
      console.log('ejemplo_:',this.codigo_usuario)
    } 
    if (this.tipoSeleccionado==4) {
      this.codigo_usuario=this.codigo_usuario+'DM';
      console.log('ejemplo_:',this.codigo_usuario)
    } 
    if (this.tipoSeleccionado==5) {
      this.codigo_usuario=this.codigo_usuario+'DS';
      console.log('ejemplo_:',this.codigo_usuario)
    }
  }

  cargo(e) {
    console.log(parseInt(e.target.value));
    this.tipoSeleccionado = parseInt(e.target.value);
    //console.log('valor_:',this.tipoSeleccionado);

    if (this.tipoSeleccionado==1) {
      this.codigo_usuario=this.codigo_usuario+'DOC';
      console.log('ejemplo_:',this.codigo_usuario)
    }  
    if (this.tipoSeleccionado==2) {
      this.codigo_usuario=this.codigo_usuario+'COOR';
      console.log('ejemplo_:',this.codigo_usuario)
    }  
    if (this.tipoSeleccionado==3) {
      this.codigo_usuario=this.codigo_usuario+'REC';
      console.log('ejemplo_:',this.codigo_usuario)
    } 
  }

  obtenerFecha() {
    this.date = new Date();
    this.date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    return this.date;
  }

  registrar() {
    var codigoUser=this.codigo_usuario;
    console.log('registrarCodigoUser()',codigoUser);
    var primerNombre = this.formRegistration.primerNombre;
    var segundoNombre = this.formRegistration.segundoNombre;
    var primerApellido = this.formRegistration.primerApellido;
    var segundoApellido = this.formRegistration.segundoApellido;
    var correo = this.formRegistration.correo;
    var clave = this.formRegistration.clave;
    var fechaRegistro = this.date;
    console.log('registrarfechaRegistro()',fechaRegistro);
    var tipo: string;
    var usuario = new Usuarios(codigoUser,primerNombre,segundoNombre,primerApellido,
                               segundoApellido,correo, clave, fechaRegistro)
    console.log('lista_:', this.listaUsuarios)
    this.limpiarCampos();

    var verificarCorreo = this.listaUsuarios.find(
      data => data.correo === usuario.correo
    )

    if (typeof verificarCorreo === "undefined") {
      this.service.setUser(usuario)
        .subscribe(data => {
          console.log('postUsuario_:', data),
          this.navigateToLogin()
            error => {
              console.log('error_postUsuario_:', error)
            }
        })
    } else {
      alert('La dirección de correo ya esta registrada')
    }
    console.log('vuelva a intentar')
    alert('Ingrese los Datos Solicitados')
    
  }

  navigateToLogin(){
    this.router.navigateByUrl('/elaborador')

  }

  limpiarCampos() {
    this.formRegistration.primerNombre = "";
    this.formRegistration.segundoNombre = "";
    this.formRegistration.primerApellido = "";
    this.formRegistration.segundoApellido = "";
    this.formRegistration.correo = "";
    this.formRegistration.clave = "";
    this.formRegistration.fechaRegistro = "";
    this.formRegistration.instituto = 0 
    this.formRegistration.carrera = 0 
    this.formRegistration.cargo = 0

  }

  validarEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }

  validarCedula(cedula: string) {
    if (cedula.length === 10) {

      // Obtenemos el digito de la region que sonlos dos primeros digitos
      const digitoRegion = cedula.substring(0, 2);

      // Pregunto si la region existe ecuador se divide en 24 regiones
      if (digitoRegion >= String(1) && digitoRegion <= String(24)) {

        // Extraigo el ultimo digito
        const ultimoDigito = Number(cedula.substring(9, 10));

        // Agrupo todos los pares y los sumo
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));

        // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }

        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }

        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }

        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }

        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }

        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;

        // Suma total
        const sumaTotal = (pares + impares);

        // extraemos el primero digito
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);

        // Obtenemos la decena inmediata
        const decena = (Number(primerDigitoSuma) + 1) * 10;

        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digitoValidador = decena - sumaTotal;

        // Si el digito validador es = a 10 toma el valor de 0
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }

        // Validamos que el digito validador sea igual al de la cedula
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }

      } else {
        // imprimimos en consola si la region no pertenece
        return false;
      }
    } else {
      // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      return false;
    }

  }


}
