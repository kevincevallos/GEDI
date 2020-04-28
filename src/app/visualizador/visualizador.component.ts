import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserData } from '../models/userData';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { DatePipe } from '@angular/common';
import { Doc } from '../models/doc';
declare let alertify: any;
declare var require: any
const FileSaver = require('file-saver');
pdfMake.vfs = pdfFonts.pdfMake.vfs
@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.component.html',
  styleUrls: ['./visualizador.component.css']
})
export class VisualizadorComponent implements OnInit {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  users: any;
  selectedItem: string;
  filtroInvitado: boolean;
  teams: any[] = [
    { id: 1, name: 'Actas Básicas' },
    { id: 2, name: 'Actas de Reunión' },
    { id: 3, name: 'Hojas de Vida' },
    { id: 4, name: 'Memorándums' },
    { id: 5, name: 'Oficios' },
    { id: 6, name: 'Solicitudes' },
    { id: 7, name: 'Desactivar Filtro' }
  ];

  listaMEM: any[] = [];
  listaACTB: any[] = [];
  listaACTR: any[] = [];
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
  codigoUser;
  code;
  name;
  date: any;
  isTrue: boolean;
  usuario: UserData;
  visible: boolean;
  invitate_string;
  invitate;
  panelOpenStateSPT: boolean;
  panelOpenStateMEM: boolean;
  panelOpenStateSOL: boolean;
  panelOpenStateACTB: boolean;
  panelOpenStateACTR: boolean;
  panelOpenStateHDV: boolean;
  panelOpenStateINV: boolean;
  panelOpenStateOFI: boolean;
  categoriaSolicitudes: boolean;
  categoriaMemorandos: boolean;
  categoriaOficios: boolean;
  categoriaActasBasicas: boolean;
  categoriaActasReunion: boolean;
  categoriaHojasdeVida: boolean;
  public doc: Doc = {
    id: 0,
    codigoDoc: ''
  }

  //propio: boolean;
  constructor(public service: ServicioService,
    public router: Router, public datepipe: DatePipe) { }
  ngOnInit() {
    this.obtenerFecha();
    this.filtroInvitado = false;
    this.categoriaSolicitudes = true;
    this.categoriaMemorandos = true;
    this.categoriaOficios = true;
    this.categoriaActasBasicas = true;
    this.categoriaActasReunion = true;
    this.categoriaHojasdeVida = true;
    this.invitate_string = localStorage.getItem('Invitado');
    this.getUsuarios();
    var user_string = localStorage.getItem("currentUser");
    var usr = JSON.parse(user_string);
    this.usuario = usr;
    var n: number = usr.id;
    var x = usr.codigo_user;
    this.code = usr.codigo_user;
    this.codigoUser = this.usuario.codigoUser;
    let name = usr.name.toLowerCase();
    var separador = " ";
    var arrayNombre = name.split(separador);
    var nombre = arrayNombre[1];
    var apellido = arrayNombre[0];
    if (nombre && apellido) {
      nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
    }
    if (!nombre && apellido) {
      apellido = '';
      nombre = arrayNombre[0];
      nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    }
    if (this.invitate_string.includes('no')) {
      this.LlenarCards();
      this.visible = true;
      Swal.fire({
        title: '¡Enhorabuena!',
        text: 'Bienvenid@ ' + nombre + ' ' + apellido + ' tienes los permisos necesarios para publicar documentos en GEDI',
        icon: 'success'
      });
    }
    if (this.invitate_string.includes('si')) {
      this.LlenarCardsInvitado();
      this.filtroInvitado = true;
      this.visible = false;
      Swal.fire({
        title: '¡Oops!',
        text: 'No cuentas con los permisos necesarios para publicar documentos en GEDI, sin embargo si podrás generar tus Documentos PDF',
        icon: 'error'
      }).then((result) => {
        Swal.fire({
          title: '¡Usuario ' + nombre + ' ' + apellido + '¡',
          text: 'Si deseas publicar tus documentos en GEDI, por favor ponte en contacto con la administración.',
          icon: 'warning'
        })
      });
    }
  }

  images = ['../../assets/descarga.jpg', '../../assets/logo-instituto-tecnologico-superior-gran-colombia.png', '../../assets/GIulRsPr_400x400.jpg'];

  obtenerFecha() {
    this.date = new Date()
    this.date = this.datepipe.transform(this.date, 'yyyy-MM-dd,HH:mm')
    //console.log('Fecha_Actual_: ',this.date)
    var fechaInicio = new Date(this.date).getTime();
    var fechaFin = new Date('2020-04-22').getTime();

    var diff = fechaFin - fechaInicio;

    //console.log('Diff_: ',diff/(1000*60*60*24) );
  }
  select(e) {
    //console.log('Categoría Seleccionada_:', e);
    if (e.includes('Solicitudes')) {
      //console.log('Categorizar por SOLICITUDES', this.categoriaSolicitudes);
      this.categoriaSolicitudes = true;
      this.categoriaMemorandos = false;
      this.categoriaActasBasicas = false;
      this.categoriaActasReunion = false;
      this.categoriaHojasdeVida = false;
      this.categoriaOficios = false;
    }
    if (e.includes('Memorándums')) {
      this.categoriaSolicitudes = false;
      this.categoriaMemorandos = true;
      this.categoriaActasBasicas = false;
      this.categoriaActasReunion = false;
      this.categoriaHojasdeVida = false;
      this.categoriaOficios = false;
    }
    if (e.includes('Actas Básicas')) {
      this.categoriaSolicitudes = false;
      this.categoriaMemorandos = false;
      this.categoriaActasBasicas = true;
      this.categoriaActasReunion = false;
      this.categoriaHojasdeVida = false;
      this.categoriaOficios = false;
    }
    if (e.includes('Actas de Reunión')) {
      this.categoriaSolicitudes = false;
      this.categoriaMemorandos = false;
      this.categoriaActasBasicas = false;
      this.categoriaActasReunion = true;
      this.categoriaHojasdeVida = false;
      this.categoriaOficios = false;
    }
    if (e.includes('Hojas de Vida')) {
      this.categoriaSolicitudes = false;
      this.categoriaMemorandos = false;
      this.categoriaActasBasicas = false;
      this.categoriaActasReunion = false;
      this.categoriaHojasdeVida = true;
      this.categoriaOficios = false;
    }
    if (e.includes('Oficios')) {
      this.categoriaSolicitudes = false;
      this.categoriaMemorandos = false;
      this.categoriaActasBasicas = false;
      this.categoriaActasReunion = false;
      this.categoriaHojasdeVida = false;
      this.categoriaOficios = true;
    }
    if (e.includes('Desactivar Filtro')) {
      //console.log('Categorizar por SOLICITUDES', this.categoriaSolicitudes);
      this.categoriaSolicitudes = true;
      this.categoriaMemorandos = true;
      this.categoriaActasBasicas = true;
      this.categoriaActasReunion = true;
      this.categoriaHojasdeVida = true;
      this.categoriaOficios = true;
      //panelOpenState-Viendo en este momento
      this.panelOpenStateSPT = false;
      this.panelOpenStateMEM = false;
      this.panelOpenStateSOL = false;
      this.panelOpenStateACTB = false;
      this.panelOpenStateACTR = false;
      this.panelOpenStateHDV = false;
      this.panelOpenStateINV = false;
      this.panelOpenStateOFI = false;
    }
  }
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
  LlenarCardsInvitado() {
    var codigoDoc;
    this.service.getDocumentos().subscribe(data => {
      codigoDoc = data;
      var m;
      for (let i = 0; i < codigoDoc.length; i++) {
        var t = codigoDoc[i].codigo_documento;
        var j = codigoDoc[i].idUsuario;
        var elemento = codigoDoc[i];
        var codigo = codigoDoc[i].codigo_user;
        var e = codigoDoc[i].idUsuario;
        if (this.usuario.id == j) {
          this.listaInvitado.push(elemento);
        }
      }
    },
      error => {
      }
    )

  }
  LlenarCards() {
    var codigoDoc;
    this.service.getDocumentos().subscribe(data => {
      //console.log('Datos_: ', data);
      codigoDoc = data;
      var m;
      for (let i = 0; i < codigoDoc.length; i++) {
        var t = codigoDoc[i].codigo_documento;
        var j = codigoDoc[i];
        //console.log('Documentos_: ',j);
        var elemento = codigoDoc[i];
        var codigo = codigoDoc[i].codigo_user;
        var e = codigoDoc[i].idUsuario;
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

        //var SPT = t.includes('SPT');
        var MEM = t.includes('MEM');
        var ACTR = t.includes('ACTR');
        var ACTB = t.includes('ACTB');
        var OFI = t.includes('OFI');
        var CON = t.includes('CON');
        var SOL = t.includes('SOL');
        var HDV = t.includes('HDV');
        var INV = t.includes('INVITADO')

        //Permisos para ACTR
        if (ACTR && coor && coordinador) {
          this.listaACTR.push(elemento);
        }
        if (ACTR && est && estudiante) {
          this.listaACTR.push(elemento);
        }
        if (ACTR && secretaria) {
          this.listaACTR.push(elemento);
        }
        if (ACTR && vicerrector) {
          this.listaACTR.push(elemento);
        }
        if (ACTR && administrador) {
          this.listaACTR.push(elemento);
        }
        if (ACTR && rector) {
          this.listaACTR.push(elemento);
        }
        if (ACTR && doc && docente) {
          this.listaACTR.push(elemento);
        }
        if (ACTR && eva && evaluador) {
          this.listaACTR.push(elemento);
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

        //Permisos para ACTB
        if (ACTB && coor && coordinador) {
          this.listaACTB.push(elemento);
          //codigoDoc.push(n);
        }
        if (ACTB && est && estudiante) {
          this.listaACTB.push(elemento);
        }
        if (ACTB && secretaria) {
          this.listaACTB.push(elemento);
        }
        if (ACTB && vicerrector) {
          this.listaACTB.push(elemento);
        }
        if (ACTB && administrador) {
          this.listaACTB.push(elemento);
        }
        if (ACTB && rector) {
          this.listaACTB.push(elemento);
        }
        if (ACTB && doc && docente) {
          this.listaACTB.push(elemento);
        }
        if (ACTB && eva && evaluador) {
          this.listaACTB.push(elemento);
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
    },
      error => {
      }
    )

  }
  cargarDatos() {
    //listaUsuarios
    for (const key in this.listaUsuarios) {
      const element = this.listaUsuarios[key];
      this.name = element.name;
      //console.log('Nombre_: ',this.name)
      this.id = element.id;

      let name = this.name.toLowerCase();
      var separador = " ";
      var arrayNombre = name.split(separador);
      var nombre = arrayNombre[1];
      var apellido = arrayNombre[0];
      if (nombre && apellido) {
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
        this.name = nombre + ' ' + apellido;
      }
      if (!nombre && apellido) {
        apellido = '';
        nombre = arrayNombre[0];
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        this.name = nombre;
      }



      //DocsDeInvitado
      for (const n in this.listaInvitado) {
        const element = this.listaInvitado[n];
        var idInvitado = this.listaInvitado[n].idUsuario;
        if (idInvitado == this.id) {
          this.listaInvitado[n].name = this.name;
        }
        if (idInvitado == this.usuario.id) {
          this.listaInvitado[n].propio = true;
        }
      }
      //ACTR
      for (const n in this.listaACTR) {
        const element = this.listaACTR[n];
        var idUsuarioACTR = this.listaACTR[n].idUsuario;
        if (idUsuarioACTR == this.id) {
          this.listaACTR[n].name = this.name;
        }
        if (idUsuarioACTR == this.usuario.id) {
          this.listaACTR[n].propio = true;
        }
      }
      //OFI
      for (const a in this.listaOFI) {
        const element = this.listaOFI[a];
        var idUsuarioOfi = this.listaOFI[a].idUsuario;
        if (idUsuarioOfi == this.id) {
          this.listaOFI[a].name = this.name
        }
        if (idUsuarioOfi == this.usuario.id) {
          this.listaOFI[a].propio = true;
        }
      }
      //ACTB
      for (const b in this.listaACTB) {
        const element = this.listaACTB[b];
        var idUsuarioACTB = this.listaACTB[b].idUsuario;
        if (idUsuarioACTB == this.id) {
          this.listaACTB[b].name = this.name
        }
        if (idUsuarioACTB == this.usuario.id) {
          this.listaACTB[b].propio = true;
        }
      }
      //MEM
      for (const q in this.listaMEM) {
        const element = this.listaMEM[q];
        var idUsuarioMEM = this.listaMEM[q].idUsuario;
        if (idUsuarioMEM == this.id) {
          this.listaMEM[q].name = this.name
        }
        if (idUsuarioMEM == this.usuario.id) {
          this.listaMEM[q].propio = true;
        }
      }
      //SOL
      for (const r in this.listaSOL) {
        const element = this.listaSOL[r];
        var idUsuarioSOL = this.listaSOL[r].idUsuario;
        if (idUsuarioSOL == this.id) {
          this.listaSOL[r].name = this.name
        }
        if (idUsuarioSOL == this.usuario.id) {
          this.listaSOL[r].propio = true;
        }
      }
      //HDV
      for (const t in this.listaHDV) {
        const element = this.listaHDV[t];
        var idUsuarioHDV = this.listaHDV[t].idUsuario;
        if (idUsuarioHDV == this.id) {
          this.listaHDV[t].name = this.name
        }
        if (idUsuarioHDV == this.usuario.id) {
          this.listaHDV[t].propio = true;
        }
      }
    }
  }
  verPdf(o) {
    var path = o.path;
    var pdf = this.service.api_GEDI_url + '/verpdf/' + path;
    var w = window.open(pdf);
  }
  descargarPdf(o) {
    var path = o.path;
    const pdfUrl = this.service.api_GEDI_url + '/verpdf/' + path;
    const pdfName = 'GEDI-' + o.name + '-' + o.id;
    FileSaver.saveAs(pdfUrl, pdfName);
  }
  editarPdf(o) {
    var fechaElab = o.fechaElaboracion;
    this.date = new Date()
    //this.date = this.datepipe.transform(this.date, 'yyyy-MM-dd,HH:mm')
    var fechaInicio = new Date(fechaElab).getTime();
    var fechaFin = new Date(this.date).getTime();
    var diff = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);
    if (diff < 1) {
      this.doc.id = o.id;
      this.doc.codigoDoc = o.codigo_documento;
      var tipo;
      return this.service.getPdf(this.doc)
        .subscribe(datos => {
          for (const key in datos) {
            const element = datos[key];
            for (const k in element) {
              const e = element;
              tipo = e.codigo_documento;
              this.service.setDoc(e);
            }
          }
          if (tipo.includes('SOL')) {
            alertify.notify('Editando documento ' + tipo, 'success', 10);
            this.router.navigate(["/solicitudes-titulacion"]);
          }
          if (tipo.includes('MEM')) {
            alertify.notify('Editando documento ' + tipo, 'success', 10);
            this.router.navigate(["/memorandums"]);
          }
          if (tipo.includes('OFI')) {
            alertify.notify('Editando documento ' + tipo, 'success', 10);
            this.router.navigate(["/oficios"]);
          }
          if (tipo.includes('ACTB')) {
            alertify.notify('Editando documento ' + tipo, 'success', 10);
            this.router.navigate(["/actas"]);
          }
          if (tipo.includes('ACTR')) {
            alertify.notify('Editando documento ' + tipo, 'success', 10);
            this.router.navigate(["/actasReuniones"]);
          }
          if (tipo.includes('HDV')) {
            alertify.notify('Editando documento ' + tipo, 'success', 10);
            this.router.navigate(["/hojasDeVida"]);
          }
          if (tipo.includes('INVITADO')) {
            alertify.notify('Un Invitado no puede editar en GEDI', 10);
            localStorage.removeItem('currentDoc');
          }
        },
          error => {
          }
        )
    }
    else {
      alertify.notify('Lo sentimos, el tiempo de edición es de 1 día!', 'error', 5);
    }
  }

}
