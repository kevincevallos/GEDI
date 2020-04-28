import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elaborador',
  templateUrl: './elaborador.component.html',
  styleUrls: ['./elaborador.component.css']
})
export class ElaboradorComponent implements OnInit {
  info: boolean;
  Sol: boolean;
  Act: boolean;
  Actr: boolean;
  Mem: boolean;
  Hdv: boolean;
  Ofi: boolean;
  headerInfo:boolean;
  loading:boolean;
  nSolicitudes;
  nActasB;
  nActasR;
  nOficios;
  nHojasDeVida;
  nMemorandos;
  nDocumentos;
  docs;
  idDoc;
  user;
  idUser;
  listaSol = [];
  listaActB = [];
  listaActR = [];
  listaOfi = [];
  listaHdv = [];
  listaMem = [];
  constructor(public service: ServicioService,
    public router: Router) {
  }

  ngOnInit() {
    this.getDocsInfo();
    this.getLocalStorageData();
    this.nSolicitudes = 0;
    this.nActasB = 0;
    this.nActasR = 0;
    this.nOficios = 0;
    this.nHojasDeVida = 0;
    this.nMemorandos = 0;
    this.nDocumentos = 0;
    this.loading=true;
    setTimeout(() => {
      this.headerInfo=true;
      this.loading=false;
    }, 2000);//past 2 second
    setTimeout(() => {
      this.headerInfo=false;
    }, 8000);//past 8 second
  }
  getLocalStorageData() {
    let jsonUser = localStorage.getItem('currentUser');
    this.user = JSON.parse(jsonUser);
    this.idUser = this.user.id;
    //console.log(this.idUser)
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
  }
  getDocsInfo() {
    return this.service.getDocumentos()
      .subscribe(datos => {
        this.docs = datos;
        for (let i = 0; i < this.docs.length; i++) {
          const documento = this.docs[i];
          const idUsuario = this.docs[i].idUsuario;
          const codigoDoc = this.docs[i].codigo_documento;
          this.idDoc = idUsuario;
          if (this.idDoc == this.idUser) {
            if (codigoDoc.includes('SOL')) {
              this.nSolicitudes++;
              this.nDocumentos++;
            }
            if (codigoDoc.includes('ACTB')) {
              this.nActasB++;
              this.nDocumentos++;
            }
            if (codigoDoc.includes('ACTR')) {
              this.nActasR++;
              this.nDocumentos++;
            }
            if (codigoDoc.includes('OFI')) {
              this.nOficios++;
              this.nDocumentos++;
            }
            if (codigoDoc.includes('HDV')) {
              this.nHojasDeVida++;
              this.nDocumentos++;
            }
            if (codigoDoc.includes('MEM')) {
              this.nMemorandos++;
              this.nDocumentos++;
            }
          }
        }
      },
        error => {
        }
      )
  }
  showHeaderInfo(){

    if (this.headerInfo) {
      this.headerInfo = false;
    } else {
      this.headerInfo = true;
    }
    
  }

}
