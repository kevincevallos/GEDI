import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from './servicio.service';
import { UserData } from './models/userData';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  visible: boolean;
  title = 'GEDI';
  mensajeBienvenida = 'Bienvenido a GEDI';
  usuario2: User;
  id:any;
  correcto:boolean;
  constructor(private router: Router, public service: ServicioService) { 
  this.visible = true;
}
public user: User = {
  correo: "",
  clave: ""
};
/*   navigateVisualizador(){
    this.router.navigate(['visualizador']);
    console.log("navigateVisualizador");
  }
  navigateElaborador(){
  this.router.navigate(['elaborador']);
  console.log("navigateElaborador");
} */

ngOnInit() {
 

}

/* reloadStorage(){
  return this.service.loginUser(this.usuario)
  .subscribe(data => {
    this.service.setUser(data[0]);
    let token = data[0].id;
    this.service.setToken(token);
    console.log('postUsuario_:', data[0].id),
    this.router.navigate(["/visualizador"]);
    location.reload();
    },
    //this.navigateToLogin()
      error => {
       alert('Credenciales Incorrectas');
       //console.log('error_postUsuario_:', error)
      }
  );
 } */


confirmarCodigo(){

  

}





}
