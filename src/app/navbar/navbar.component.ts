import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { User } from '../models/user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  admin:boolean;
  constructor(private router: Router,
    public service: ServicioService) {
      //this.ngOnInit();      

     }
    user: any;
    ngOnInit(){
      this.admin=false;
      this.user = this.service.getCurrentUser();
      if (this.user.role_id==5||this.user.role_id==6){
        this.admin=true;
      }
      //console.log('userNavBar',this.user.role_id)
    }

    logout(): void{
      this.service.logoutUser();
      this.router.navigate(["/login"]);
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
  isGestionUsuariosView(){
    return this.router.url.match('/gestion-usuarios');

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