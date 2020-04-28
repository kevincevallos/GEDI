import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { User } from '../models/user';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loading: boolean;
  admin: boolean;
  date: any;
  constructor(private router: Router,
    public service: ServicioService, public datepipe: DatePipe) {
    //this.ngOnInit();      

  }
  user: any;

  ngOnInit() {
    //1000ms=1second
    setTimeout(() => {
      this.obtenerFecha();
      //window.location.reload();
      //console.log('Page reload!!');
    }, 1000);//reloading every 10 minutes
    this.admin = false;
    this.user = this.service.getCurrentUser();
    let name = this.user.name.toLowerCase();
    var separador = " ";    
    var arrayNombre = name.split(separador);
    var nombre = arrayNombre[1];
    var apellido = arrayNombre[0];
    if (nombre&&apellido) {
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
    this.user.name = nombre +' '+ apellido;
    }
    if (!nombre&&apellido) {
      apellido='';
      nombre=arrayNombre[0];
      nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      this.user.name = nombre;
    }
    /* if (this.user.role_id == 5 || this.user.role_id == 6) {
      this.admin = true;
    } */
    //console.log('userNavBar',this.user.role_id)
  }

  logout(): void {
    this.service.logoutUser();
    localStorage.removeItem('Invitado');
    localStorage.removeItem('currentDoc');
    this.router.navigate(["/login"]);
  }

  obtenerFecha() {
    this.date = new Date()
    this.date = this.datepipe.transform(this.date, 'HH:mm:ss')
    this.ngOnInit();
    //console.log('Fecha_Actual_: ',this.date)
  }
  isRegistrationView() {
    // return true if the current page is registration
    return this.router.url.match('/registration');
  }

  isLoginView() {
    // return true if the current page is login
    return this.router.url.match('/login');
  }

  isVisualizadorView() {
    // return true if the current page is visualizador
    return this.router.url.match('/visualizador');
  }
  isElaboradorView() {
    // return true if the current page is elaborador
    return this.router.url.match('/elaborador');
  }
  isHomeView() {
    // return true if the current page is login or registration
    return this.router.url.match('/login|/registration');
  }
  isUserView() {
    return this.router.url.match('/visualizador|/elaborador|/gestion-usuarios');

  }
  isGestionUsuariosView() {
    return this.router.url.match('/gestion-usuarios');

  }

  loader() {
    this.loading = true
  }

  isActasView() {
    // return true if the current page is actas
    return this.router.url.match('/actas');
  }
  isSolicitudesView() {
    // return true if the current page is solicitudes
    return this.router.url.match('/solicitudes');
  }
  isMemorandumsView() {
    // return true if the current page is memorandums
    return this.router.url.match('/memorandums');
  }
  isOficiosView() {
    // return true if the current page is oficios
    return this.router.url.match('/oficios');
  }
  isHojasDeVidaView() {
    // return true if the current page is hojasDeVida
    return this.router.url.match('/hojasDeVida');
  }
  isDocumentosView() {
    // return true if the current page is varios tipos de documento
    return this.router.url.match('/actas|/solicitudes|/memorandums|/oficios|/hojasDeVida');
  }
}