import { Component, OnInit } from '@angular/core';
import { Request, Response } from 'express';
//import { pool } from '../database';
import { QueryResult } from 'pg';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserData } from '../models/userData';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.component.html',
  styleUrls: ['./visualizador.component.css']
})
export class VisualizadorComponent implements OnInit {
  users: any;
  listaSPT: any[] = [];
  listaMEM: any[] = [];
  listaCON: any[] = [];
  listaACT: any[] = [];
  listaHDV: any[] = [];
  listaSOL: any[] = [];
  listaOFI: any[] = [];
  listaInvitado: any[] = [];
  listaUsuarios: UserData[] = [];
  nuevosDocumentos: any[] = [];
  user: UserData;
  id: number;
  n: number;
  datos: boolean;
  //name: string;
  codigoUser;
  code;
  name;
  isTrue: boolean;
  //users:any[]=[];
  usuario: UserData;
  visible: boolean;
  invitate_string;
  invitate;
  panelOpenStateSPT:boolean;
  panelOpenStateMEM:boolean;
  panelOpenStateSOL:boolean;
  panelOpenStateACT:boolean;
  panelOpenStateHDV:boolean;
  panelOpenStateINV:boolean;
  panelOpenStateOFI:boolean;
  //propio: boolean;
  constructor(public service: ServicioService,
    public router: Router) {

  }
  ngOnInit() {
    //this.propio = false;
    this.invitate_string = localStorage.getItem('Invitado');
    //this.invitate = JSON.parse(this.invitate_string);
    console.log('INVITATE_:', this.invitate_string);
    this.llenarTarjetas();
    this.getUsuarios();
    this.getLocalStorageData();
    //this.getCurrentUser();

    //this.usuario.id=0;
    var user_string = localStorage.getItem("currentUser");
    var usr = JSON.parse(user_string);
    this.usuario = usr;
    console.log(this.usuario)
    var n: number = usr.id;
    //this.usuario.id = n;
    var x = usr.codigo_user;
    this.code = usr.codigo_user;
    this.codigoUser = x;
    let name = usr.name;
    console.log('Name_: ', this.usuario.name);
    if (this.code) {
      localStorage.setItem('Invitado', 'no');
      //console.log(code);
      this.visible = true;
      Swal.fire({
        title: '¡Enorabuena!',
        text: 'Bienvenid@ ' + name + ' tienes los permisos necesarios para publicar documentos en GEDI',
        icon: 'success'
      });
    }
    if (!this.code) {
      localStorage.setItem('Invitado', 'si');
      this.visible = false;
      //console.log('Usuario sin código!!');
      Swal.fire({
        title: '¡Oops!',
        text: 'No cuentas con los permisos necesarios para publicar documentos en GEDI, sin embargo si podrás generar tus Documentos PDF',
        icon: 'error'
      }).then((result) => {

        Swal.fire({
          title: '¡Usuario ' + name + '¡',
          text: 'Si deseas publicar tus documentos en GEDI, por favor ponte en contacto con la administración.',
          icon: 'warning'
        })
      });

    }

  }

  llenarTarjetas() {

    console.log('LOCAL_STORAGE_:', this.invitate_string);
    if (this.invitate_string.includes('si')) {
      this.LlenarCardsInvitado();
      console.log('INVITATED');
    }
    else if (this.invitate_string.includes('no')) {
      this.LlenarCards();
      console.log('NON-INVITATED');
    }
  }

  images = ['../../assets/descarga.jpg', '../../assets/logo-instituto-tecnologico-superior-gran-colombia.png', '../../assets/GIulRsPr_400x400.jpg'];

  getUsuarios() {
    this.service.getUsers()
      .subscribe(response => {
        for (const key in response) {
          const element = response[key];
          //console.log(element);
          this.listaUsuarios.push(element);
        }
        this.n = this.listaUsuarios.length;
        //console.log('Esto_es_n_:',n);
        this.cargarDatos();
      });
  }
  getLocalStorageData() {

    var invitate_string = localStorage.getItem("Invitado");
    /* var invitate = JSON.parse(invitate_string);
     */
    //console.log('LOCAL_STORAGE_:',invitate_string);

  }
  LlenarCardsInvitado() {
    var codigoDoc;
    this.service.getDocumentos().subscribe(data => {
      codigoDoc = data;
      //console.log('Nueva Consulta_:', codigoDoc)
      var m;
      for (let i = 0; i < codigoDoc.length; i++) {
        var t = codigoDoc[i].codigo_documento;
        var j = codigoDoc[i].idUsuario;
        //console.log(j);
        var elemento = codigoDoc[i];
        var codigo = codigoDoc[i].codigo_user;
        var e = codigoDoc[i].idUsuario;
        //console.log('Codigo_documentos_:',e);
        //console.log('LlenarCards()_:',this.codigoUser);
        //var coor = this.codigoUser.includes('COOR');
        if (this.usuario.id == j) {
          this.listaInvitado.push(elemento);
        }
      }
      //this.datos=true;

    },
      //this.navigateToLogin()
      error => {
        //alert('Error FindById()');
        //console.log('error_postUsuario_:', error)
      }
    )

  }
  LlenarCards() {
    var codigoDoc;
    this.service.getDocumentos().subscribe(data => {
      codigoDoc = data;
      //console.log('Nueva Consulta_:', codigoDoc)
      var m;
      for (let i = 0; i < codigoDoc.length; i++) {
        var t = codigoDoc[i].codigo_documento;
        var j = codigoDoc[i].idUsuario;
        //console.log(j);
        var elemento = codigoDoc[i];
        var codigo = codigoDoc[i].codigo_user;
        var e = codigoDoc[i].idUsuario;
        console.log('Codigo_documentos_:', e);
        //console.log('LlenarCards()_:',this.codigoUser);
        //var coor = this.codigoUser.includes('COOR');
        if (this.usuario.id == j) {
          this.listaInvitado.push(elemento);
        }
        //Roles de usuario
        var coor = codigo.includes('COOR');
        var est = codigo.includes('EST');
        var sec = codigo.includes('SEC');//PE
        var vic = codigo.includes('VIC');//PE
        var adm = codigo.includes('ADM');//PE
        var rec = codigo.includes('REC');//PE
        var doc = codigo.includes('DOC');
        var eva = codigo.includes('EVAL');

        var coordinador = this.codigoUser.includes('COOR');
        var estudiante = this.codigoUser.includes('EST');
        var secretaria = this.codigoUser.includes('SEC');
        var vicerrector = this.codigoUser.includes('VIC');
        var administrador = this.codigoUser.includes('ADM');
        var rector = this.codigoUser.includes('REC');
        var docente = this.codigoUser.includes('DOC');
        var evaluador = this.codigoUser.includes('EVAL');
        //var invitado = this.codigoUser.includes('INVITADO');

        var SPT = t.includes('SPT');
        var MEM = t.includes('MEM');
        var ACT = t.includes('ACT');
        var OFI = t.includes('OFI');
        var CON = t.includes('CON');
        var SOL = t.includes('SOL');
        var HDV = t.includes('HDV');
        var INV = t.includes('INVITADO')
        //console.log(n);
        //Permisos para INVITADO!!
        /*  if (INV && this.usuario.id==j){
           this.listaInvitado.push(elemento);
         } */
        //Permisos para SPT
        if (SPT && coor && coordinador) {
          this.listaSPT.push(elemento);
        }
        if (SPT && est && estudiante) {
          this.listaSPT.push(elemento);
        }
        if (SPT && secretaria) {
          this.listaSPT.push(elemento);
        }
        if (SPT && vicerrector) {
          this.listaSPT.push(elemento);
        }
        if (SPT && administrador) {
          this.listaSPT.push(elemento);
        }
        if (SPT && rector) {
          this.listaSPT.push(elemento);
        }
        if (SPT && doc && docente) {
          this.listaSPT.push(elemento);
        }
        if (SPT && eva && evaluador) {
          this.listaSPT.push(elemento);
        }
        //Permisos para MEM
        if (MEM && coor && coordinador) {
          this.listaMEM.push(elemento);
          //codigoDoc.push(n);
        }
        if (MEM && est && estudiante) {
          //console.log('Soy Estudiante!!');
          this.listaMEM.push(elemento);
        }
        if (MEM && secretaria) {
          this.listaMEM.push(elemento);
        }
        if (MEM && vicerrector) {
          this.listaMEM.push(elemento);
        }
        if (MEM && administrador) {
          this.listaMEM.push(elemento);
        }
        if (MEM && rector) {
          this.listaMEM.push(elemento);
        }
        if (MEM && doc && docente) {
          this.listaMEM.push(elemento);
        }
        if (MEM && eva && evaluador) {
          this.listaMEM.push(elemento);
        }

        //Permisos para ACT
        if (ACT && coor && coordinador) {
          this.listaACT.push(elemento);
          //codigoDoc.push(n);
        }
        if (ACT && est && estudiante) {
          this.listaACT.push(elemento);
        }
        if (ACT && secretaria) {
          this.listaACT.push(elemento);
        }
        if (ACT && vicerrector) {
          this.listaACT.push(elemento);
        }
        if (ACT && administrador) {
          this.listaACT.push(elemento);
        }
        if (ACT && rector) {
          this.listaACT.push(elemento);
        }
        if (ACT && doc && docente) {
          this.listaACT.push(elemento);
        }
        if (ACT && eva && evaluador) {
          this.listaACT.push(elemento);
        }

        //Permisos para OFI
        if (OFI && coor && coordinador) {
          this.listaOFI.push(elemento);
          //codigoDoc.push(n);
        }
        if (OFI && est && estudiante) {
          this.listaOFI.push(elemento);
        }
        if (OFI && secretaria) {
          this.listaOFI.push(elemento);
        }
        if (OFI && vicerrector) {
          this.listaOFI.push(elemento);
        }
        if (OFI && administrador) {
          this.listaOFI.push(elemento);
        }
        if (OFI && rector) {
          this.listaOFI.push(elemento);
        }
        if (OFI && doc && docente) {
          this.listaOFI.push(elemento);
        }
        if (OFI && eva && evaluador) {
          this.listaOFI.push(elemento);
        }

        //Permisos para CON
        if (CON && coor && coordinador) {
          this.listaCON.push(elemento);
          //codigoDoc.push(n);
        }
        if (CON && est && estudiante) {
          this.listaCON.push(elemento);
        }
        if (CON && secretaria) {
          this.listaCON.push(elemento);
        }
        if (CON && vicerrector) {
          this.listaCON.push(elemento);
        }
        if (CON && administrador) {
          this.listaCON.push(elemento);
        }
        if (CON && rector) {
          this.listaCON.push(elemento);
        }
        if (CON && doc && docente) {
          this.listaCON.push(elemento);
        }
        if (CON && eva && evaluador) {
          this.listaCON.push(elemento);
        }

        //Permisos para SOL
        if (SOL && coor && coordinador) {
          this.listaSOL.push(elemento);
          //codigoDoc.push(n);
        }
        if (SOL && est && estudiante) {
          this.listaSOL.push(elemento);
        }
        if (SOL && secretaria) {
          this.listaSOL.push(elemento);
        }
        if (SOL && vicerrector) {
          this.listaSOL.push(elemento);
        }
        if (SOL && administrador) {
          this.listaSOL.push(elemento);
        }
        if (SOL && rector) {
          this.listaSOL.push(elemento);
        }
        if (SOL && doc && docente) {
          this.listaSOL.push(elemento);
        }
        if (SOL && eva && evaluador) {
          this.listaSOL.push(elemento);
        }

        //Permisos para HDV
        if (HDV && coor && coordinador) {
          this.listaHDV.push(elemento);
          //codigoDoc.push(n);
        }
        if (HDV && est && estudiante) {
          this.listaHDV.push(elemento);
        }
        if (HDV && secretaria) {
          this.listaHDV.push(elemento);
        }
        if (HDV && vicerrector) {
          this.listaHDV.push(elemento);
        }
        if (HDV && administrador) {
          this.listaHDV.push(elemento);
        }
        if (HDV && rector) {
          this.listaHDV.push(elemento);
        }
        if (HDV && doc && docente) {
          this.listaHDV.push(elemento);
        }
        if (HDV && eva && evaluador) {
          this.listaHDV.push(elemento);
        }
      }
      //this.datos=true;

    },
      //this.navigateToLogin()
      error => {
        //alert('Error FindById()');
        //console.log('error_postUsuario_:', error)
      }
    )


  }
  cargarDatos() {

    //condiciones
    for (const key in this.listaUsuarios) {
      const element = this.listaUsuarios[key];
      this.name = element.name;
      this.id = element.id;
      //console.log(element);

      //Invitados
      for (const n in this.listaInvitado) {
        const element = this.listaInvitado[n];
        var idInvitado = this.listaInvitado[n].idUsuario;
        //console.log('Id_Usuario_: ',idUsuario)
        if (idInvitado == this.id) {
          //this.propio = true;
          //console.log('Nombre_: ', this.name,'ID_: ',this.id);
          this.listaInvitado[n].name = this.name;
          //console.log('NOMBRESPTUSER_: ',this.listaSPT[n]);
        }
      }
      //SPT
      for (const n in this.listaSPT) {
        const element = this.listaSPT[n];
        var idUsuario = this.listaSPT[n].idUsuario;
        //console.log('Id_Usuario_: ',idUsuario)
        if (idUsuario == this.id) {
          //console.log('Nombre_: ', this.name,'ID_: ',this.id);
         
          this.listaSPT[n].name = this.name;
          //console.log('NOMBRESPTUSER_: ',this.listaSPT[n]);
        }
        if (idUsuario==this.usuario.id) {
          //console.log('Mi_ID_:', this.usuario.id);
          this.listaSPT[n].propio = true;
          //this.propio=false;
        }
       
      }

      //oficios
      for (const a in this.listaOFI) {
        const element = this.listaOFI[a];
        var idUsuarioOfi = this.listaOFI[a].idUsuario;
        //console.log('id_Usuario_:',idUsuarioOfi)
        if (idUsuarioOfi == this.id) {
          //this.propio = true;
          //console.log(this.name)
          this.listaOFI[a].name = this.name
        }
        if (idUsuario==this.usuario.id) {
          //console.log('Mi_ID_:', this.usuario.id);
          this.listaOFI[a].propio = true;
          //this.propio=false;
        }

      }
      //actas
      for (const b in this.listaACT) {
        const element = this.listaACT[b];
        var idUsuarioACT = this.listaACT[b].idUsuario;
        //console.log('id_Usuario:',idUsuarioACT)
        if (idUsuarioACT == this.id) {
          //this.propio = true;
          //console.log(this.name)
          this.listaACT[b].name = this.name
        }
        if (idUsuario==this.usuario.id) {
          //console.log('Mi_ID_:', this.usuario.id);
          this.listaACT[b].propio = true;
          //this.propio=false;
        }
      }

      //MEMOS
      for (const q in this.listaMEM) {
        const element = this.listaMEM[q];
        var idUsuarioMEM = this.listaMEM[q].idUsuario;
        console.log('id Usuario', idUsuarioMEM)
        if (idUsuarioMEM == this.id) {
          //this.propio = true;
          console.log(this.name)
          this.listaMEM[q].name = this.name
        }
        if (idUsuario==this.usuario.id) {
          //console.log('Mi_ID_:', this.usuario.id);
          this.listaMEM[q].propio = true;
          //this.propio=false;
        }
      }

      //CONVO
      for (const w in this.listaCON) {
        const element = this.listaCON[w];
        var idUsuarioCON = this.listaCON[w].idUsuario;
        //console.log('id Usuario',idUsuarioCON)
        if (idUsuarioCON == this.id) {
          //this.propio = true;
          //console.log(this.name)
          this.listaCON[w].name = this.name
        }
        if (idUsuario==this.usuario.id) {
          //console.log('Mi_ID_:', this.usuario.id);
          this.listaCON[w].propio = true;
          //this.propio=false;
        }
      }

      //solici
      for (const r in this.listaSOL) {
        const element = this.listaSOL[r];
        var idUsuarioSOL = this.listaSOL[r].idUsuario;
        //console.log('id Usuario',idUsuarioSOL)
        if (idUsuarioCON == this.id) {
          //this.propio = true;
          //console.log(this.name)
          this.listaSOL[r].name = this.name
        }
        if (idUsuario==this.usuario.id) {
          //console.log('Mi_ID_:', this.usuario.id);
          this.listaSOL[r].propio = true;
          //this.propio=false;
        }
      }

      //HDV
      for (const t in this.listaHDV) {
        const element = this.listaHDV[t];
        var idUsuarioHDV = this.listaHDV[t].idUsuario;
        //console.log('id Usuario',idUsuarioHDV)

        if (idUsuarioHDV == this.id) {
          //this.propio = true;
          //console.log(this.name)
          this.listaHDV[t].name = this.name
        }
        if (idUsuario==this.usuario.id) {
          //console.log('Mi_ID_:', this.usuario.id);
          this.listaHDV[t].propio = true;
          //this.propio=false;
        }
      }
    }
  }
verPdf(o){
  //alert('Ver PDF usuario: '+o.path+'-'+o.name);
  //var documento = pdfMake.createPdf(o.path).open();
  for (const key in o) {
      const element = o[key];
      console.log('Element_: ',o[key]);
  }
  //console.log('Objetos O_: '+o);
    /*  generarPdf(accion = 'open') {
     const defenicionSolicitud = this.getDefinicionSolicitud();
     switch (accion) {
       case 'open': pdfMake.createPdf(defenicionSolicitud).open(); break;
       case 'print': pdfMake.createPdf(defenicionSolicitud).print(); break;
       case 'download': pdfMake.createPdf(defenicionSolicitud).download(); break;
       default: pdfMake.createPdf(defenicionSolicitud).open(); break
     }
 
   } */
}
descargarPdf(o){
  alert('Descargar PDF usuario: '+o.idUsuario+'-'+o.name);
}
editarPdf(o){
  alert('Editar PDF usuario: '+o.idUsuario+'-'+o.name);
}

}
