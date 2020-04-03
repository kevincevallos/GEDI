import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = 'GEDI';
  mensajeBienvenida = 'Bienvenido a GEDI';

  constructor(private router: Router) { }


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