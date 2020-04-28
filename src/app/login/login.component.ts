import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { User } from "../models/user";
import { NgForm } from '@angular/forms';
import { UserData } from '../models/userData';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'GEDI';
  mensajeBienvenida = 'Bienvenido a GEDI';
  formLogin: any;
  listaUsuarios = [];
  loginForm: FormGroup;
  loading;
  submitted = false;
  returnUrl: string;
  url: string;
  id:any;
  datos: any[] = [];
  codigoUsuarioGenerado:string;
 //usuario; 
 x;
  token;
  codigoUsuario;
  rol_id;
  carrera_id;
  constructor(private service: ServicioService,
    private formBuilder: FormBuilder,
    private router: Router) { }
  public user: User = {
    correo: "",
    clave: ""
  };
  public usuario: UserData = {
    correo: "",
    clave: "",
    codigoUser: "",
    email: "",
    id:0,
    name:"",
    role_id:0,
    user_name:""
  }
  ngOnInit() {
    this.loading=false;
    this.formLogin = this.formBuilder.group({
      correo: '',
      clave: ''
    });

    let data = this.service.getToken();
    if (data) {
      this.router.navigate(["/visualizador"]);
    }
    //this.verificar();

    /* this.service.getUsers().subscribe(
      (getdatos:any[]) =>  this.listaUsuarios = getdatos ,
      (error: HttpErrorResponse) => { console.log(error.message)},
      ()=> console.log('peticion Finalizada',this.listaUsuarios)) */

  }


  login() {
    this.loading=true;
    return this.service.loginUser(this.user)
      .subscribe(datos => {
        //console.log(datos);
        //this.datos.push(datos);
        for (const i in datos) {
          const element = datos[i];
          this.usuario.id = datos[i].id;
          this.usuario.role_id = datos[i].role_id;
          this.usuario.correo = datos[i].email;
          this.usuario.name = datos[i].name;
          this.usuario.user_name = datos[i].user_name;
          //this.usuario.id = this.datos[i].id;
          this.usuario.codigoUser = datos[i].codigo_user;
          console.log('ELEMENT_:',this.usuario);
        }
        if(this.usuario.codigoUser){
          console.log('Existe Código Usuario');
          this.service.setUser(this.usuario);
          this.service.setToken(this.usuario.id);
          this.loading=false;
          localStorage.setItem('Invitado','no');
          this.router.navigate(["/visualizador"]);
        } else{
          console.log('Código usuario Nulo');
          this.generarRol(this.usuario.role_id);
        }
        //
        //let token = datos[0].id;
        //console.log('tokenID_:',token);

        //this.token = token;
        //this.service.setToken(this.token);
        //this.x = datos[0].codigo_user;
        //console.log('this.datos_: ',this.datos);
      },
      //this.navigateToLogin()
      error => {
        this.loading=false;
        alertify.notify('Credenciales incorrectas!', 'error', 3);
        //console.log('error_postUsuario_:', error)
      }
    )
  }
  generarRol(rol){
    //console.log('PRUEBA!', this.usuario);
        //console.log('row',obj);
        //obj.admin = admin;
        //var username: string = obj.name;
        //var rol_id: number = usr.role_id;
        //alert('Rol_:' + rol_id);
        if (rol == 1) {
          this.codigoUsuarioGenerado = 'COOR';
          //console.log('cargo_:', this.codigoUsuarioGenerado);
        }
        if (rol == 2) {
          this.codigoUsuarioGenerado = 'EST';
          //console.log('cargo_:', this.codigoUsuarioGenerado);
        }
        if (rol == 3) {
          this.codigoUsuarioGenerado = 'SEC';
          //console.log('cargo_:', this.codigoUsuarioGenerado);
        }
        if (rol == 4) {
          this.codigoUsuarioGenerado = 'VIC';
          //console.log('cargo_:', this.codigoUsuarioGenerado);
        }
        if (rol == 5) {
          this.codigoUsuarioGenerado = 'ADM';
          //console.log('cargo_:', this.codigoUsuarioGenerado);
        }
        if (rol == 6) {
          this.codigoUsuarioGenerado = 'REC';
          //console.log('cargo_:', this.codigoUsuarioGenerado);
        }
        if (rol == 7) {
          this.codigoUsuarioGenerado = 'DOC';
          //console.log('cargo_:', this.codigoUsuarioGenerado);
        }
        if (rol == 8) {
          this.codigoUsuarioGenerado = 'EVAL';
          //console.log('cargo_:', this.codigoUsuarioGenerado);
        }
//this.loading=false;
this.generarCarrera();
  }
  generarCarrera(){
    var n: number = 0;
    this.service.findById({ id: this.usuario.id }).subscribe(data => {
      //console.log('carrera_id_:', data[0].carrera_id);
      //alert('carrera_id_:' + data[0].carrera_id);
      //alert('findById_:'+data);
      this.carrera_id = data[0].carrera_id;
      for (const key in data) {
        if (data.hasOwnProperty(key))
          n++;
        //console.log('n_:',n);
        //console.log('element_:',data[key]);
      }
      if (n > 1) {
        //console.log('pertenece a varios institutos');
        //console.log('ROL_:',rol_id);
        this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'YAV';
        //console.log('Carrera_:', this.codigoUsuarioGenerado);
      }
      if (n == 1) {
        //console.log('pertenece a 1 instituto!');
        //console.log('CARRERA_ID:',carrera_id);
        if (this.carrera_id == 1) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'DSBJ';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
        if (this.carrera_id == 2) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'MK24M';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
        if (this.carrera_id == 3) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'DMGRC';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
        if (this.carrera_id == 4) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'GTYAV';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
        if (this.carrera_id == 5) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'ACYAV';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
        if (this.carrera_id == 6) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'MKYAV';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
        if (this.carrera_id == 7) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'ASYAV';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
        if (this.carrera_id == 8) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'ELCYAV';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
        if (this.carrera_id == 9) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'ELTYAV';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
        if (this.carrera_id == 10) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'DSBJ';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
        if (this.carrera_id == 11) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'GNYAV';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
        if (this.carrera_id == 12) {
          this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + 'DMGRC';
          //console.log('Carrera_:', this.codigoUsuarioGenerado);
        }
      }
      var num = Math.floor((Math.random() * (9999 - 1)) + 1);
      //console.log('ALEATORIO_: ', num);
      this.codigoUsuarioGenerado = this.codigoUsuarioGenerado + num;
      this.usuario.codigoUser = this.codigoUsuarioGenerado.toString();
      localStorage.setItem('Invitado','no');
      //console.log('CÓDIGO_:',this.usuario.codigoUser, this.codigoUsuarioGenerado);
      this.loading=false;
      this.updateUser(this.usuario);
      this.service.setUser(this.usuario);
      this.service.setToken(this.usuario.id);
      this.router.navigate(["/visualizador"]);

      //this.usuario2=this.usuario[0];
      //this.datos[0].codigo_user = this.usuario.codigoUser;
      //this.service.setUser(this.datos[0]);
      //this.verificar();
      /* var user_ = localStorage.getItem("currentUser");
      var usr2 = JSON.parse(user_);
      console.log('LocalStorage2_:', usr2) */


      //this.openSnackBar('Código: "' + codigoUsuario + '" generado para ' + username, 'OK');
      //console.log('btn_:',this.btn)
      //this.btn._disabled=true;
      //this.correcto=true;
    },
      error => {
        alertify.notify('Ingresando como Invitado','success',3);
        this.loading=false;
        localStorage.setItem('Invitado','si');
        this.service.setUser(this.usuario);
        this.router.navigate(["/visualizador"]);
        //console.log('error_postUsuario_:', error)
      }

    )
  }
  
  updateUser(usuario: UserData) {
    this.service.updateUser(usuario).subscribe(data => {
    },
      error => {
        //console.log('error_updateUser_:', error)
      }
    )
  }

}
