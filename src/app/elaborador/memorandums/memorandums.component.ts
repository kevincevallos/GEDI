import { Component, OnInit } from '@angular/core';
import { Memorandums } from 'src/app/models/memorandums';
import pdfMake from 'pdfmake/build/pdfmake';
import { DatePipe } from '@angular/common'
import { FormBuilder } from '@angular/forms'
import { ServicioService } from 'src/app/servicio.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userData';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
declare let alertify: any;
@Component({
  selector: 'app-memorandums',
  templateUrl: './memorandums.component.html',
  styleUrls: ['./memorandums.component.css']
})
export class MemorandumsComponent implements OnInit {

  memo = new Memorandums();
  date: any;
  InstitutoPertenciciente: string
  dateS: any;
  fechaS: any;
  usuario: UserData;
  dialog: any;
  memoCodigoUsuario: string;
  codigoGet: string;
  numeroActual: number;
  numeroSiguiente: number;
  listaDocumentos: any[] = [];
  n: number;
  carreraxUser;
  codigoDoc;
  m;
  invitado;
  loading: boolean;
  listaProf = [];
  logoYav: string | ArrayBuffer;
  logoBj: string | ArrayBuffer;
  logo24M: string | ArrayBuffer;
  logoGrc: string | ArrayBuffer;
  para: string;
  keyword = "name";
  documento: any;
  editable: boolean;
  blobPdf: Blob;
  constructor(private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    public service: ServicioService,
    public router: Router, public http: HttpClient) {
    this.memo = JSON.parse(sessionStorage.getItem('memo')) || new Memorandums();
  }
  selectPara(item) {
    this.para = item.name
  }
  ngOnInit() {
    this.loading = true;
    this.n = 0;
    this.service.getUsers().subscribe(
      (getdatos: any[]) => {
        /*         console.log(getdatos)
 */        for (let i = 0; i < getdatos.length; i++) {
          var element = getdatos[i].name;

          let name = element.toLowerCase();
          var separador = " ";
          var arrayNombre = name.split(separador);
          var nombre = arrayNombre[1];
          var apellido = arrayNombre[0];
          if (nombre && apellido) {
            nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
            apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
            element = nombre + ' ' + apellido;
            getdatos[i].name = element;
          }
          if (!nombre && apellido) {
            apellido = '';
            nombre = arrayNombre[0];
            nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
            element = nombre;
            getdatos[i].name = element;
          }

          //console.log(element);
        }
        this.listaProf = getdatos
      },
      (error: HttpErrorResponse) => { console.log(error.message) })
    this.obtenerFecha()
    this.obtenerfechaS();
    this.fechaS = this.formBuilder.group({
      fechaS: ''
    })
    this.memo.codigoDocumento = 'MEM-';
    this.memoCodigoUsuario = 'MEM-';
    this.getLocalStorageData();
    if (this.documento) {
      this.memoCodigoUsuario = this.documento.codigo_documento;
      this.loading = false;
      this.editable = true;
    }
    else {
      this.loading = true;
      this.editable = false;
      this.constaEnCarrera();
    }
  }
  //metodos  a usar

  imagenUriYav() {
    //logoYav
    this.http.get('/assets/logoYav.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const x = reader.result;
          this.logoYav = x;
          this.memo.logoPic = this.logoYav;
          //console.log('ImagenEnBase64_LogoYav_: ', this.logoYav);
        }
        reader.readAsDataURL(res);
        //console.log('RES_: ',res);
      })
  }
  imagenUriBj() {
    //logBj
    this.http.get('/assets/logoBj.jpg', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoBj = reader.result;
          this.memo.logoPic = this.logoBj;
          //console.log('ImagenEnBase64_: ', this.logoBj);
        }
        reader.readAsDataURL(res);
        //console.log('RES_: ',res);
      })
  }
  imagenUriGrc() {
    //logoGrc
    this.http.get('/assets/logoGrc.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoGrc = reader.result;
          this.memo.logoPic = this.logoGrc;
          //console.log('ImagenEnBase64_: ', this.logoGrc);
        }
        reader.readAsDataURL(res);
        //console.log('RES_: ',res);
      })
  }
  imagenUri24M() {
    //logo24M
    this.http.get('/assets/logo24m.jpg', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logo24M = reader.result;
          this.memo.logoPic = this.logo24M;
          //console.log('ImagenEnBase64_: ', this.logo24M);
        }
        reader.readAsDataURL(res);
        //console.log('RES_: ',res);
      })
  }
  getLocalStorageData() {
    /*localStorage*/
    let user_string = localStorage.getItem("currentUser");
    let user = JSON.parse(user_string);
    var x = user;
    //var id_usuario:number = x.id;
    this.usuario = user;

    let name = this.usuario.name.toLowerCase();
    var separador = " ";
    var arrayNombre = name.split(separador);
    var nombre = arrayNombre[1];
    var apellido = arrayNombre[0];
    if (nombre && apellido) {
      nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
      this.usuario.name = nombre + ' ' + apellido;
    }
    if (!nombre && apellido) {
      apellido = '';
      nombre = arrayNombre[0];
      nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      this.usuario.name = nombre;
    }

    this.usuario.codigoUser = x.codigoUser;
    //console.log(this.usuario.codigoUser);
    this.memo.idUsuario = this.usuario.id;
    this.memo.codigoUsuario = this.usuario.codigoUser;
    let doc_string = localStorage.getItem("currentDoc");
    let doc = JSON.parse(doc_string);
    this.documento = doc;

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
      //console.log('El usuario consta en la tabla CarrerasxUser!!');
      this.invitado = 'no';
      this.generarCodigo();
    },
      error => {
        //console.log('variable n2_:', this.n);
        //console.log('El usuario NO consta en la tabla CarrerasxUser!!')
        this.invitado = 'si';
        this.generarCodigoInvitado();
      }
    )
  }
  generarCodigo() {
    var carrera_id = this.carreraxUser;
    if (this.n > 1) {
      //console.log('generarCodigo()_:', this.memoCodigoUsuario, this.memo.codigoDocumento)
      this.memoCodigoUsuario = this.memo.codigoDocumento + 'ITSYAV-' + this.dateS + '-';
      this.imagenUriYav();
      //this.memo.logoPic = this.logoYav;
      this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Yavirac'
    } else
      if (this.n == 1) {
        if (carrera_id == 1) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITSBJ-' + this.dateS + '-';
          this.imagenUriBj();
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Benito Juarez'
        }
        if (carrera_id == 2) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITS24M-' + this.dateS + '-';
          this.imagenUri24M();
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior 24 De Mayo'
        }
        if (carrera_id == 3) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITSGC-' + this.dateS + '-';
          this.imagenUriGrc();
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Gran Colombia'
        }
        if (carrera_id == 4) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          this.imagenUriYav();
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Yavirac'
        }
        if (carrera_id == 5) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          this.imagenUriYav();
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Yavirac'
        }
        if (carrera_id == 6) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          this.imagenUriYav();
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Yavirac'
        }
        if (carrera_id == 7) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          this.imagenUriYav();
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Yavirac'
        }
        if (carrera_id == 8) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          this.imagenUriYav()
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Yavirac'
        }
        if (carrera_id == 9) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITSBJ-' + this.dateS + '-';
          this.imagenUriBj()
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Benito Juarez'
        }
        if (carrera_id == 10) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          this.imagenUriYav();
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Yavirac'
        }
        if (carrera_id == 11) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          this.imagenUriYav()
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Yavirac'
        }
        if (carrera_id == 12) {
          this.memoCodigoUsuario = this.memoCodigoUsuario + 'ITSGC-' + this.dateS + '-';
          this.imagenUriGrc();
          this.memo.InstitutoPertenciciente = 'Instituto Tecnológico Superior Gran Colombia'
        }
      }
    this.comprobarDocumentosExistentes();
  }
  generarCodigoInvitado() {
    this.memoCodigoUsuario = 'GEDI-';
    this.memo.codigoDocumento = 'GEDI-'
    //console.log(this.memo.codigoDocumento);
    this.memoCodigoUsuario = this.memoCodigoUsuario + 'INVITADO-' + this.dateS + '-';
    this.imagenUriYav();
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
        //console.log('Hay Documentos existentes!!', data);
        if (this.invitado.includes('no')) {
          //console.log('No es invitado');
          this.generarNumeracionDocumento();
          this.loading = false;
        }
        if (this.invitado.includes('si')) {
          //console.log('Si es invitado');
          this.generarNumeracionDocumentoInvitado();
          this.loading = false;
        }
      } else {
        //console.log('NO Existen Documentos!!');
        this.memoCodigoUsuario = this.memoCodigoUsuario + 1;
        this.memo.codigoDocumento = this.memoCodigoUsuario;
        this.loading = false;
      }
    },
      error => {
        //console.log('error_comprobarDocumentosExistentes()_:')
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
      n = t.includes('MEM');
      //console.log(n);
      if (n) {
        //console.log('Variable_t_:', t)

        this.listaDocumentos.push(elemento);
        existe = true
        //codigoDoc.push(n);
      }
    }
    if (!existe) {
      //console.log('No hay Documentos SPTs');
      this.memoCodigoUsuario = this.memoCodigoUsuario + 1;
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
          this.memoCodigoUsuario = this.memoCodigoUsuario + k;
          this.memo.codigoDocumento = this.memoCodigoUsuario;

        }
      }
      //

    }
    //console.log('codigo_documento_generado:', this.memoCodigoUsuario, this.memo.codigoDocumento)
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
      this.memoCodigoUsuario = this.memoCodigoUsuario + 1;
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
          this.memoCodigoUsuario = this.memoCodigoUsuario + k;
          this.memo.codigoDocumento = this.memoCodigoUsuario;

        }
      }
      //

    }
    //console.log('codigo_documento_generado:', this.memoCodigoUsuario, this.memo.codigoDocumento)
  }

  ///////////////////////Fin de métodos escenciales////////////////////////
  ///////////////////////Comienza generación de PDF////////////////////////
  guardarBorrador() {
    sessionStorage.setItem('solicitud-titulacion', JSON.stringify(this.memo));
  }
  publicarEnGedi() {
    const defenicionSolicitud = this.getDocumentDefinition();
    const pdf = pdfMake.createPdf(defenicionSolicitud);
    pdf.getBlob(async (blob) => {
      this.blobPdf = blob;
      await this.blobPdf;
      //console.log('PDF_TO_BLOB_: ',this.blobPdf);
    })
    /////PUBLICAR COMO INVITADO/////
    //console.log(this.invitado);
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
  publicar() {
    const formData = new FormData();
    const file = new File([this.blobPdf], 'doc.pdf', { type: 'application/pdf' });
    //console.log('Antes_del_Append_file_: ',file,'document.pdf');

    formData.append("upload", file);
    formData.append("codDoc", this.memoCodigoUsuario);
    formData.append("codUser", this.usuario.codigoUser);
    formData.append("idUser", this.usuario.id.toString());

    this.service.setDocumento(formData);
    //console.log('ANTES_DE_:', this.solicitudCodigoDocumento)
    this.memoCodigoUsuario = '';
    //console.log('ANTES_DE_:', this.solicitud.codigoDocumento)
    this.memo.codigoDocumento = '';
    setTimeout(() => {
      this.ngOnInit();
      //console.log('Page reload!!');
    }, 5000);//1000ms=1Sec
  }
  publicarEditado() {
    const defenicionSolicitud = this.getDocumentDefinition();
    const pdf = pdfMake.createPdf(defenicionSolicitud);
    pdf.getBlob(async (blob) => {
      this.blobPdf = blob;
      await this.blobPdf;
    })
    //console.log('publicarEditado_: ', this.blobPdf);
    /////PUBLICAR COMO USUARIO GEDI/////
    Swal.fire({
      title: this.usuario.name + ' vas a editar un documento en GEDI',
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
        this.publicarEdit();
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
  publicarEdit() {
    //console.log('publicarEdit_::', this.blobPdf);
    const formData = new FormData();
    const file = new File([this.blobPdf], 'docEdit.pdf', { type: 'application/pdf' });
    //console.log(file);    
    formData.append("cod", this.memoCodigoUsuario);
    formData.append("upload", file);
    this.service.updatePdf(formData);
    //console.log('ANTES_DE_:', this.solicitudCodigoDocumento)
    this.memoCodigoUsuario = '';
    //console.log('ANTES_DE_:', this.solicitud.codigoDocumento)
    this.memo.codigoDocumento = '';
    setTimeout(() => {
      this.loading = false;
      localStorage.removeItem('currentDoc');
      this.ngOnInit();
      //console.log('Page reload!!');
    }, 4000);//1000ms=1Sec
  }
  cancelarEdicion() {
    localStorage.removeItem('currentDoc');
    this.ngOnInit();
    alertify.notify('Edición Cancelada!', 'error', 10);
  }
  backToHome() {
    localStorage.removeItem('currentDoc');
    this.router.navigate(["/visualizador"]);
    alertify.notify('De vuelta en el Visualizador!', 'success', 10);
  }
  resetearForm() {
    this.memo = new Memorandums();
    sessionStorage.removeItem('solicitud-titulacion');
  }
  getDocumentDefinition() {
    sessionStorage.setItem('memo', JSON.stringify(this.memo));
    return {
      content: [
        {
          columns: [
            [{
              image: this.memo.logoPic,
              width: 100,
              height: 75,
              style: 'img',
              alignment: 'left'
            }]
          ]
        },
        {
          text: this.memo.InstitutoPertenciciente,

          style: 'titulo'
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 3, x2: 590 - 2 * 30, y2: 3, lineWidth: 3 }]
        },

        {
          text: `Memorándum`,
          style: 'titulo',
          margin: [20, 20, 20, 20]
        },
        {
          text: this.memoCodigoUsuario,
          style: 'titulo'
        },
        {
          columns: [
            [
              {
                text: `De : ${this.usuario.name}`,
                style: 'cabecera'
              },
              {
                text: `Para : ${this.para}`,
                style: 'cabecera'
              },
              {
                text: `Asunto: ${this.memo.asunto}`,
                style: 'cabecera'
              },
              {
                text: `Fecha: ${this.date}`,
                style: 'cabecera'
              }
            ]
          ]
        },
        {
          text: this.memo.cuerpo,
          style: 'body'
        },

        {
          text: this.memo.despedida,
          style: 'body'
        },
        {
          text: 'Atentamente',
          alignment: 'center',
          fontSize: 12,
          margin: [0, 40, 0, 60]
        },
        {
          text: ` ${this.usuario.name}`,
          style: 'pie'
        },
        {
          text: this.memo.InstitutoPertenciciente,
          style: 'pie'
        }
      ],
      info: {
        title: this.usuario.name + '_Memorando',
        author: this.usuario.name,
        subject: 'Memorando',
        keywords: 'Memorando, ONLINE Memorando',
      },
      styles: {
        titulo: {
          fontSize: 16,
          bold: true,
          margin: [0, 20, 0, 20],
          upperCase: true,
          alignment: 'center',
          textTransform: 'uppercase'
        },
        cabecera: {
          fontSize: 12,
          margin: [5, 10, 5, 10],
          textAlign: 'justify'
        },
        body: {
          fontSize: 12,
          fontFamily: 'times new roman',
          margin: [5, 10, 5, 10],
          textAlign: 'justify'
        },
        pie: {
          fontSize: 12,
          fontFamily: 'times new roman',
          margin: [5, 10, 5, 10],
          bold: true,
          alignment: 'center',
          textAlign: 'justify'
        }
      }
    };
  }
  resetForm() {
    this.memo = new Memorandums();
    sessionStorage.removeItem('memo');
  }

}