import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import { ActasReuniones, Orden, Docentes } from 'src/app/models/actas-reuniones';
import { DatePipe } from '@angular/common'
import { sign } from 'crypto';
import { HttpErrorResponse } from '@angular/common/http';
import { ServicioService } from 'src/app/servicio.service';
import { FormBuilder } from '@angular/forms';
import { UserData } from 'src/app/models/userData';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare let alertify: any;
pdfMake.vfs=pdfFonts.pdfMake.vfs
@Component({
  selector: 'app-actas-reuniones',
  templateUrl: './actas-reuniones.component.html',
  styleUrls: ['./actas-reuniones.component.css']
})
export class ActasReunionesComponent implements OnInit {

  keyword = 'name'
  reunion = new ActasReuniones()
  hora = new Date().getHours().toString()
  min = new Date().getMinutes().toString()
  date : any
  involucrado : any
  listaDocentes = []
  dateS:any
  listaInvolucrados = []
  usuario:UserData
  dialog:any
  actaReunionesCodigoUsuario:string
  codigoGet:string
  numeroActual:number
  numeroSiguiente:number;
  listaDocumentos:any[]=[]
  n: number;
  carreraxUser;
  codigoDoc;
  m;
  invitado;
  loading: boolean;
  constructor(private formBuilder:FormBuilder
    ,public datepipe: DatePipe,
    public service: ServicioService) {

    
    this.reunion = JSON.parse(sessionStorage.getItem('acta-reunion')) || new ActasReuniones();
    if (!this.reunion.ordenDelDia || this.reunion.ordenDelDia.length === 0) {
      this.reunion.ordenDelDia = [];
      this.reunion.ordenDelDia.push(new Orden());
    }
    
    if (!this.reunion.involucrados || this.reunion.involucrados.length === 0) {
      this.reunion.involucrados = [];
      this.reunion.involucrados.push(new Docentes());
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.n = 0;
    this.service.getDocentes().subscribe(
      (getdatos:any[]) =>  this.listaDocentes = getdatos ,
      (error: HttpErrorResponse) => { console.log(error.message)},
      ()=> console.log('peticion Finalizada',this.listaDocentes))

    this.obtenerFecha()
    this.obtenerfechaS()
    this.reunion.codigoDocumento='ACT-';
    this.actaReunionesCodigoUsuario = 'ACT-';
    this.getLocalStorageData();
    this.constaEnCarrera();
  }
  getLocalStorageData() {
    /*localStorage*/
    let user_string = localStorage.getItem("currentUser");
    let user = JSON.parse(user_string);
    var x = user;
    //var id_usuario:number = x.id;
    this.usuario = user;
    this.usuario.codigoUser = x.codigo_user;
    this.reunion.idUsuario = this.usuario.id;
    this.reunion.codigoUsuario = this.usuario.codigoUser;
    //console.log(this.usuario.id, this.usuario.codigoUser);
    //console.log('user_string_:', user_string);
    console.log('usuario.id_:', this.usuario);

  }
  obtenerFecha() {
    this.date = new Date()
    this.date = this.datepipe.transform(this.date, 'yyyy-MM-dd')
  }
  obtenerfechaS() {
    this.dateS = new Date()
    this.dateS = this.datepipe.transform(this.dateS, 'yyyy')
  }
  constaEnCarrera() {
    this.service.findById(this.usuario).subscribe(data => {
      this.carreraxUser = data[0].carrera_id;
      for (const key in data) {
        if (data.hasOwnProperty(key))
          this.n++
      }
      //console.log('variable n1_:', this.n);
      console.log('El usuario consta en la tabla CarrerasxUser!!');
      this.invitado = 'no';
      this.generarCodigo();
    },
      error => {
        //console.log('variable n2_:', this.n);
        console.log('El usuario NO consta en la tabla CarrerasxUser!!')
        this.invitado = 'si';
        this.generarCodigoInvitado();
      }
    )
  }
  generarCodigo() {
    var carrera_id = this.carreraxUser;
    if (this.n > 1) {
      console.log('generarCodigo()_:',this.actaReunionesCodigoUsuario, this.reunion.codigoDocumento)
      this.actaReunionesCodigoUsuario = this.reunion.codigoDocumento + 'I.T.S.YAV-' + this.dateS + '-';
      //console.log('ifMayor1_:', this.solicitudCodigoDocumento);
    } else
      if (this.n == 1) {
        if (carrera_id == 1) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.B.J.M-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 2) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.24.M.K-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 3) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.G.C.M-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 4) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.YAV.AC.V-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 5) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.YAV.GT.M-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 6) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.YAV.MK-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 7) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.YAV.ELT.N-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 8) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.YAV.ELT.V-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 9) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.B.J.V-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 10) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.YAV.AC.M-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 11) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.YAV.GT.V-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 12) {
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'I.T.S.G.C.DM.V-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
      }
    this.comprobarDocumentosExistentes();
  }
  generarCodigoInvitado() {
    this.actaReunionesCodigoUsuario = 'GEDI-';
    this.reunion.codigoDocumento = 'GEDI-'
    console.log(this.reunion.codigoDocumento);
    this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 'INVITADO-' + this.dateS + '-';
    //this.reunion.logoPic;
    this.comprobarDocumentosExistentes();
  }
  comprobarDocumentosExistentes() {
    this.service.getDocumentos().subscribe(data => {
      //Actualización 17/4/2020
      this.codigoDoc = data;
      let array = [];
      //array.push(data);
      //console.log('Nueva Consulta_:', this.codigoDoc)
      var element;
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          element = data[key];
          array.push(element);
          //console.log('ELEMENT_2_:',array[key]);
        }
      }
      if (Array.isArray(array) && array.length) {
        console.log('Hay Documentos existentes!!', data);
        if (this.invitado.includes('no')) {
          console.log('No es invitado');
          this.generarNumeracionDocumento();
          this.loading = false;
        }
        if (this.invitado.includes('si')) {
          console.log('Si es invitado');
          this.generarNumeracionDocumentoInvitado();
          this.loading = false;
        }
      } else {
        //console.log('NO Existen Documentos!!');
        this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 1;
        this.reunion.codigoDocumento = this.actaReunionesCodigoUsuario;

      }
    },
      error => {
        console.log('error_comprobarDocumentosExistentes()_:')
      }
    )
  }
  generarNumeracionDocumento() {
    //console.log('this.codigoDoc_:', this.codigoDoc);
    //if (this.codigoDoc) {
    var n;
    var existe: boolean = false;
    for (let i = 0; i < this.codigoDoc.length; i++) {
      var t = this.codigoDoc[i].codigo_documento;
      var elemento = this.codigoDoc[i];
      n = t.includes('ACT');
      //console.log(n);
      if (n) {
        console.log('Variable_t_:', t)

        this.listaDocumentos.push(elemento);
        existe = true
        //codigoDoc.push(n);
      }
    }
    if (!existe) {
      console.log('No hay Documentos SPTs');
      this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 1;
    } else {
      for (let m = 0; m < this.listaDocumentos.length; m++) {
        const element = this.listaDocumentos[m];
        //console.log('listaDocumentos_:', element);
      }
      this.listaDocumentos.forEach(element => {
        //console.log('ELEMENT_:',element);
        this.m = element.codigo_documento;
        this.codigoGet = this.m;
      });
      //var long = this.codigoGet.length;
      //console.log('long_:', long);
      var cad2 = this.m.slice(-1);
      var cad3 = this.m.slice(-2);
      var cad4 = this.m.slice(-3);
      if (cad3 > 10 && cad3 < 100) {
        //console.log('cad3_:', cad3)
        cad2 = this.m.slice(-2);
        //console.log('cad2_:', cad2);
      }
      if (cad4 > 100 && cad3 < 1000) {
        cad2 = this.m.slice(-3);
      }
      //console.log('antes_del_if_:', cad2);
      //cad2 = +cad2;
      if (cad2 == 0) {
        cad2 = this.m.slice(-2);
        //console.log('if_cad2_:', cad2);
      }
      if (cad3 == 0) {
        cad2 = this.m.slice(-3);
        //console.log('if_cad2_:', cad2);
      }
      this.numeroActual = cad2;
      // parseInt(cad2);
      //console.log('Códigos_Tabla_Documentos()_:', this.codigoGet);
      //console.log(cad2, this.numeroActual);
      var x;
      for (var y = 1; y <= 1000; y++) {
        x = y;
        if (this.numeroActual == x) {
          x++
          var k = x;
          //console.log('k_:', k)
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + k;
          this.reunion.codigoDocumento = this.actaReunionesCodigoUsuario;

        }
      }
      //

    }
    console.log('codigo_documento_generado:', this.actaReunionesCodigoUsuario, this.reunion.codigoDocumento)
  }
  generarNumeracionDocumentoInvitado() {
    //console.log('this.codigoDoc_:', this.codigoDoc);
    //if (this.codigoDoc) {
    var n;
    var existe: boolean = false;
    for (let i = 0; i < this.codigoDoc.length; i++) {
      var t = this.codigoDoc[i].codigo_documento;
      var elemento = this.codigoDoc[i];
      //console.log(t)
      n = t.includes('INVITADO');
      //console.log(n);
      if (n) {
        this.listaDocumentos.push(elemento);
        //codigoDoc.push(n);
        existe = true;
      }
    }
    if (!existe) {
      //console.log('No hay Documentos INVITADO');
      this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + 1;
    } else {
      for (let m = 0; m < this.listaDocumentos.length; m++) {
        const element = this.listaDocumentos[m];
        //console.log('listaDocumentos_:', element);
      }
      this.listaDocumentos.forEach(element => {
        //console.log('ELEMENT_:',element);
        this.m = element.codigo_documento;
        this.codigoGet = this.m;
      });
      //var long = this.codigoGet.length;
      //console.log('long_:', long);
      var cad2 = this.m.slice(-1);
      var cad3 = this.m.slice(-2);
      var cad4 = this.m.slice(-3);
      if (cad3 > 10 && cad3 < 100) {
        //console.log('cad3_:', cad3)
        cad2 = this.m.slice(-2);
        //console.log('cad2_:', cad2);
      }
      if (cad4 > 100 && cad3 < 1000) {
        cad2 = this.m.slice(-3);
      }
      //console.log('antes_del_if_:', cad2);
      //cad2 = +cad2;
      if (cad2 == 0) {
        cad2 = this.m.slice(-2);
        //console.log('if_cad2_:', cad2);
      }
      if (cad3 == 0) {
        cad2 = this.m.slice(-3);
        //console.log('if_cad2_:', cad2);
      }
      this.numeroActual = cad2;
      // parseInt(cad2);
      //console.log('Códigos_Tabla_Documentos()_:', this.codigoGet);
      //console.log(cad2, this.numeroActual);
      var x;
      for (var y = 1; y <= 1000; y++) {
        x = y;
        if (this.numeroActual == x) {
          x++
          var k = x;
          //console.log('k_:', k)
          this.actaReunionesCodigoUsuario = this.actaReunionesCodigoUsuario + k;
          this.reunion.codigoDocumento = this.actaReunionesCodigoUsuario;

        }
      }
      //

    }
    console.log('codigo_documento_generado:', this.actaReunionesCodigoUsuario, this.reunion.codigoDocumento)
  }

  ///////////////////////Fin de métodos escenciales////////////////////////
  ///////////////////////Comienza generación de PDF////////////////////////
  guardarBorrador(){
    sessionStorage.setItem('solicitud-titulacion', JSON.stringify(this.reunion));
  }
  visualizarPdf(){
    const defenicionSolicitud = this.getDocumentDefinition();
    const pdf:Object = pdfMake.createPdf(defenicionSolicitud).open();
    console.log('visualizarPdf()_: ',pdf);
  }
  publicarEnGedi() {
    /////PUBLICAR COMO INVITADO/////
    if (this.invitado.includes('si')) {
      Swal.fire({
        title: this.usuario.name + ' publicarás como invitado',
        text: "Este documento solo lo podrás visualizar tú y los cargos administrativos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Publicar!',
        cancelButtonText: 'Cancelar!',
        timer: 5000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.value) {
          this.publicar();
          //console.log('VALUE_DATA_Invitado:',a,c);
          Swal.fire(
            'Publicado!',
            'Tu documento ha sido publicado en GEDI como invitado.',
            'success'
          )
        }
      })

    }
    /////PUBLICAR COMO USUARIO GEDI/////
    if (this.invitado.includes('no')) {
      //alert('ERES USUARIO DE GEDI!');
      Swal.fire({
        title: this.usuario.name + ' vas a publicar en GEDI',
        html: "Si publicas tu documento estará disponible para ti y otros usuarios en la pestaña <b>Visualizador</b>",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Publicar!',
        cancelButtonText: 'Cancelar!',
        timer: 5000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.value) {
          this.publicar();
          Swal.fire(
            'EXCELENTE!',
            this.usuario.name + ' Tu documento ha sido publicado en GEDI.',
            'success'
          )
          alertify.notify('Publicado con éxito!', 'success', 2);
        } else {
          alertify.notify('Cancelado!', 'error', 2);
        }
      })
    }
  }
  /*  generarPdf(accion = 'open') {
     const defenicionSolicitud = this.getDefinicionSolicitud();
     switch (accion) {
       case 'open': pdfMake.createPdf(defenicionSolicitud).open(); break;
       case 'print': pdfMake.createPdf(defenicionSolicitud).print(); break;
       case 'download': pdfMake.createPdf(defenicionSolicitud).download(); break;
       default: pdfMake.createPdf(defenicionSolicitud).open(); break
     }
 
   } */
  publicar() {
    const formData = new FormData();
    const defenicionSolicitud = this.getDocumentDefinition();
    const pdf = pdfMake.createPdf(defenicionSolicitud);
    const blob = new Blob([pdf], { type: 'application/octet-stream' });
    //console.log('metodo_obtenerPdf()_:', blob);
    formData.append("upload", blob);
    formData.append("codDoc", this.actaReunionesCodigoUsuario);
    formData.append("codUser", this.usuario.codigoUser);
    formData.append("idUser", this.usuario.id.toString());

    this.service.setDocumento(formData);
    console.log('ANTES_DE_:', this.actaReunionesCodigoUsuario)
    this.actaReunionesCodigoUsuario = '';
    console.log('ANTES_DE_:', this.reunion.codigoDocumento)
    this.reunion.codigoDocumento = '';
    setTimeout(() => {
      this.ngOnInit();
      //console.log('Page reload!!');
    }, 3000);//1000ms=1Sec
  }

  selectCoordinador(item) {
      this.reunion.coordinador = item.name
  }

  selectSecretaria(item) {
      this.reunion.secretaria = item.name
  }

  selectInvolucrados(item) {
    this.listaInvolucrados.push(item)
    console.log('listaInvolucrados_:',this.listaInvolucrados)
  }

  selectRevisado(item){
    this.reunion.revisado = item.name 
  }

  selectAprobadoUno(item){
    this.reunion.aprobadoUno = item.name
  }

  selectAprobadoDos(item){
    this.reunion.aprobadoDos = item.name
  }
  selectAprobadoTres(item){
    this.reunion.aprobadoTres = item.name
  }
  selectAprobadoCuatro(item){
    this.reunion.aprobadoCuatro = item.name
  }

  agregarOrden () {
    this.reunion.ordenDelDia.push(new Orden())
  }

  agregarInvolucrados () {
    this.reunion.involucrados.push(new Docentes())
  }

  resetForm() {
    this.reunion = new ActasReuniones();
    sessionStorage.removeItem('acta-reunion');
    this.listaInvolucrados = []
  }

  getDocumentDefinition() {
    sessionStorage.setItem('acta-reunion', JSON.stringify(this.reunion));
    return {
      content: [
        /*  {
            image: ''
            ,fit: [50, 50]
          }, *//* 
        {
          text: 'Instituto el cual pertenece el usuario',
          
          style : 'titulo'
        }, */
        {
          text: 'ACTA DE REUNIÓN',
          style : 'titulo'
        },
        {
          text: this.actaReunionesCodigoUsuario,
          style : 'titulo'
        },
        {
          text: ` En el Distrito Metropolitano de Quito, provincia de Pichincha, siendo las ${this.hora}:${this.min}, del día ${this.date}, luego de verificar el quórum reglamentario, se instala la sesión de investigación, la misma que es presidida por ${this.reunion.coordinador} coordinador de Carrera; actúa como secretari@ de la reunión ${this.reunion.secretaria}; con la asistencia de los siguientes docentes:`,
          style: 'body'
        },
        {
          ul : [
            ...this.listaInvolucrados.filter((name, index) => index % 3 === 0).map(d => d.name)
          ]
        },
        {
          ul : [
            ...this.listaInvolucrados.filter((name, index) => index % 3 === 1).map(d => d.name)
          ]
        },
        {
          ul : [
            ...this.listaInvolucrados.filter((name, index) => index % 3 === 2).map(d => d.name)
          ]
        },
        {
          text: 'Orden del Dia',
          style: 'subTitulo'
        },
        {
          ul : [
            ...this.reunion.ordenDelDia.filter((orden, index) => index % 3 === 0).map(o => o.orden)
          ],
          style: 'body'
        },
        {
          ul : [
            ...this.reunion.ordenDelDia.filter((orden, index) => index % 3 === 1).map(o => o.orden)
          ],
          style: 'body'
        },
        {
          ul : [
            ...this.reunion.ordenDelDia.filter((orden, index) => index % 3 === 2).map(o => o.orden)
            
          ],
          style: 'body'
        },
        {
          text: 'Desarrollo',
          style: 'subTitulo'
        },
        {
          ul : [
            ...this.reunion.ordenDelDia.filter((orden, index) => index % 3 === 0).map(o => o.orden)
          ]
        },
        {
          text : this.reunion.ordenDelDia.filter((descripcion, index) => index % 3 === 0).map(o => o.descripcion),
          style: 'body'
        },
        {
          ul : [
            ...this.reunion.ordenDelDia.filter((orden, index) => index % 3 === 1).map(o => o.orden)
          ]
        },
        
        {
          text : this.reunion.ordenDelDia.filter((descripcion, index) => index % 3 === 1).map(o => o.descripcion),
          style: 'body'
        },
        {
          ul : [
            ...this.reunion.ordenDelDia.filter((orden, index) => index % 3 === 2).map(o => o.orden)
          ]
        },
        
        {
          text : this.reunion.ordenDelDia.filter((descripcion, index) => index % 3 === 2).map(o => o.descripcion),
          style: 'body'
        },
        {
          text: 'Para constancia de lo actuado firman: ',
          fontSize: 12,
          margin : [5 , 40 , 5 ,60]
        },
        {
          table: {
            widths: ['*', '*'],
            body: [
              [{
                text: 'Elaborado por:',
                style: 'tableHeader',

              },
              {
                text: 'Revisado y Aprobado por:',
                style: 'tableHeader'
              }
              ],
              [
                {
                  text: `"nombre del usuario logeado"`
                  ,style : 'sign'
                },
                {
                  text: this.reunion.revisado,
                  style: 'sign'
                }
              ],
              [
                {
                  text: 'Aprobado por:',
                  style: 'tableHeader',
                  colSpan: 2
                },
                {}
              ],
              [
                {
                  text: this.reunion.aprobadoUno,
                  style: 'sign'
                },
                {
                  text: this.reunion.aprobadoDos,
                  style: 'sign'
                }
              ],
              [
                {
                  text: this.reunion.aprobadoTres,
                  style: 'sign'
                },
                {
                  text: this.reunion.aprobadoCuatro,
                  style: 'sign'
                }
              ]
            ],
          }
        }
      ],
        styles: {
          titulo: {
            fontSize: 14,
            bold: true,
            margin: [0, 20, 0, 20],
            alignment: 'center',
            textAlign: 'justify'
          },
          subTitulo: {
            fontSize: 13,
            bold: true,
            margin: [5, 10, 5, 10]
          },
          cabecera: {
            fontSize: 12,
            margin: [5, 10, 5, 10],
            textAlign: 'justify'
          },
          body: {
            fontSize: 12,
            fontFamily : 'times new roman',
            margin : [5, 10,5,10],
            textAlign: 'justify'
          },
          pie : {
            fontSize: 12,
            fontFamily : 'times new roman',
            margin : [5, 10,5,10],
            bold: true,
            alignment : 'center',
            textAlign: 'justify'
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
            alignment: 'center',
          }
        }
    };
  }

/*   generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  } */

}
