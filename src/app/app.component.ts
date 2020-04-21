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
ngOnInit() {
 //1000ms=1second
  setTimeout(() => {
    window.location.reload();
    //console.log('Page reload!!');
  }, 600000);//reloading every 10 minutes
}
}
