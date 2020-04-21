import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { User } from "../models/user";
import { NgForm } from '@angular/forms';
import { UserData } from '../models/userData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'GEDI';
  mensajeBienvenida = 'Bienvenido a GEDI';
  formLogin : any;
  listaUsuarios = [];
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  url: string;
  //id:any;
  datos:any[]=[];
  usuario: UserData;
  constructor(private service: ServicioService,
    private formBuilder: FormBuilder,
    private router: Router) { }
public user: User = {
  correo: "",
  clave: ""
};

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      correo :'',
      clave:''
    });

    let data=this.service.getToken();
    if (data) {
          this.router.navigate(["/visualizador"]);
    }
    /* this.service.getUsers().subscribe(
      (getdatos:any[]) =>  this.listaUsuarios = getdatos ,
      (error: HttpErrorResponse) => { console.log(error.message)},
      ()=> console.log('peticion Finalizada',this.listaUsuarios)) */

  }


  login(){
   return this.service.loginUser(this.user)
   .subscribe(datos => {
     this.service.setUser(datos[0]);
     let token = datos[0].id;
     this.service.setToken(token);
     var x = datos[0].codigo_user;
     if (!x) {
       console.log('x es nulo')
       var user_string = localStorage.getItem("currentUser");
       var usr = JSON.parse(user_string);
       var num:any = usr.id;
       this.usuario=usr;
       //this.id = usr.id;
       var code = usr.codigo_user;
       if (!code) {
        console.log('PRUEBA!',this.usuario);
    
          var codigoUsuario:string;
          //console.log('row',obj);
          //obj.admin = admin;
          //var username: string = obj.name;
          var rol_id: number = usr.role_id;
          if (rol_id == 1) {
            codigoUsuario = 'COOR';
            console.log('cargo_:', codigoUsuario);
          }
          if (rol_id == 2) {
            codigoUsuario = 'EST';
            console.log('cargo_:', codigoUsuario);
          }
          if (rol_id == 3) {
            codigoUsuario = 'SEC';
            console.log('cargo_:', codigoUsuario);
          }
          if (rol_id == 4) {
            codigoUsuario = 'VIC';
            console.log('cargo_:', codigoUsuario);
          }
          if (rol_id == 5) {
            codigoUsuario = 'ADM';
            console.log('cargo_:', codigoUsuario);
          }
          if (rol_id == 6) {
            codigoUsuario = 'REC';
            console.log('cargo_:', codigoUsuario);
          }
          if (rol_id == 7) {
            codigoUsuario = 'DOC';
            console.log('cargo_:', codigoUsuario);
          }
          if (rol_id == 8) {
            codigoUsuario = 'EVAL';
            console.log('cargo_:', codigoUsuario);
          }

              //this.usuario.id = 0;
              console.log('Id seleccionado: ',token);
              var n: number = 0;
              var carrera_id;
              this.usuario.id=num;
              this.service.findById(this.usuario).subscribe(data => {
                console.log('carrera_id_:', data[0].carrera_id);
                carrera_id = data[0].carrera_id;
                for (const key in data) {
                  if (data.hasOwnProperty(key))
                    n++;
                  //console.log('n_:',n);
                  //console.log('element_:',data[key]);
                }
                if (n > 1) {
                  //console.log('pertenece a varios institutos');
                  //console.log('ROL_:',rol_id);
                  codigoUsuario = codigoUsuario + 'YAV';
      
                }
                if (n == 1) {
                  //console.log('pertenece a 1 instituto!');
                  //console.log('CARRERA_ID:',carrera_id);
                  if (carrera_id == 1) {
                    codigoUsuario = codigoUsuario + 'DSBJ';
                    console.log('Carrera_:', codigoUsuario);
                  }
                  if (carrera_id == 2) {
                    codigoUsuario = codigoUsuario + 'MK24M';
                    console.log('Carrera_:', codigoUsuario);
                  }
                  if (carrera_id == 3) {
                    codigoUsuario = codigoUsuario + 'DMGRC';
                    console.log('Carrera_:', codigoUsuario);
                  }
                  if (carrera_id == 4) {
                    codigoUsuario = codigoUsuario + 'GTYAV';
                    console.log('Carrera_:', codigoUsuario);
                  }
                  if (carrera_id == 5) {
                    codigoUsuario = codigoUsuario + 'ACYAV';
                    console.log('Carrera_:', codigoUsuario);
                  }
                  if (carrera_id == 6) {
                    codigoUsuario = codigoUsuario + 'MKYAV';
                    console.log('Carrera_:', codigoUsuario);
                  }
                  if (carrera_id == 7) {
                    codigoUsuario = codigoUsuario + 'ASYAV';
                    console.log('Carrera_:', codigoUsuario);
                  }
                  if (carrera_id == 8) {
                    codigoUsuario = codigoUsuario + 'ELCYAV';
                    console.log('Carrera_:', codigoUsuario);
                  }
                  if (carrera_id == 9) {
                    codigoUsuario = codigoUsuario + 'ELTYAV';
                    console.log('Carrera_:', codigoUsuario);
                  }
                  if (carrera_id == 10) {
                    codigoUsuario = codigoUsuario + 'DSBJ';
                    console.log('Carrera_:', codigoUsuario);
                  }
                  if (carrera_id == 11) {
                    codigoUsuario = codigoUsuario + 'GNYAV';
                    console.log('Carrera_:', codigoUsuario);
                  }
                  if (carrera_id == 12) {
                    codigoUsuario = codigoUsuario + 'DMGRC';
                    console.log('Carrera_:', codigoUsuario);
                  }
                }
                var num = Math.floor((Math.random() * (9999 - 1)) + 1);
                console.log('ALEATORIO_: ', num);
                codigoUsuario = codigoUsuario + num;
                this.usuario.codigoUser=codigoUsuario.toString();
                console.log('ID_Y_CODIGO_:',this.usuario.id,this.usuario.codigoUser)
                this.updateUser(this.usuario);
                //this.usuario2=this.usuario[0];
                datos[0].codigo_user=this.usuario.codigoUser;
                this.service.setUser(datos[0]);
                var user_ = localStorage.getItem("currentUser");
                var usr2 = JSON.parse(user_);
                console.log('LocalStorage2_:',usr2)
                //this.router.navigate(["/visualizador"]);
                //location.reload();
                //this.openSnackBar('Código: "' + codigoUsuario + '" generado para ' + username, 'OK');
                //console.log('btn_:',this.btn)
                //this.btn._disabled=true;
                //this.correcto=true;
              },
                //this.navigateToLogin()
                error => {
                  //this.correcto=false;
                  //this.generado=false;
                  //this.openSnackBar("Usuario " + username + " no consta en una carrera", 'OK')
                  //alert('Error FindById()');
                  //console.log('error_postUsuario_:', error)
                }
              )

      }
     }
     this.router.navigate(["/visualizador"]);
     location.reload();
     },
     //this.navigateToLogin()
       error => {
        alert('Credenciales Incorrectas');
        //console.log('error_postUsuario_:', error)
       }
   );
  }
  
  updateUser(usuario: UserData){
    this.service.updateUser(usuario).subscribe(data => {
      },
      error => {
        console.log('error_updateUser_:', error)
      }
    )
  }

  navegation(){
    this.router.navigateByUrl('/visualizador')
  }

  validarEmail( email ) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }

  validarInputs(campo){
    if(campo !== ""){
      return true
    }else{
      return false
    }
  }
}
