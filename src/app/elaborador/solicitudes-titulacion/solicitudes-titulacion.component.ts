import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { SolicitudesTitulacion, Ing } from '../../models/solicitudes-titulacion';
import { FormBuilder } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { ServicioService } from 'src/app/servicio.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userData';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare let alertify: any;
pdfMake.vfs = pdfFonts.pdfMake.vfs
@Component({
  selector: 'app-solicitudes-titulacion',
  templateUrl: './solicitudes-titulacion.component.html',
  styleUrls: ['./solicitudes-titulacion.component.css']
})
export class SolicitudesTitulacionComponent implements OnInit {
  solicitud = new SolicitudesTitulacion();
  listaProf = [];
  date: any;
  fecha: any;
  dateS: any;
  fechaS: any;
  usuario: UserData;
  dialog: any;
  solicitudCodigoDocumento: string;
  codigoGet: string;
  numeroActual: number;
  numeroSiguiente: number;
  listaDocumentos: any[] = []
  destinatario: string;
  keyword = "name"
  InstitutoPerteneciente: string;
  logoYav: string | ArrayBuffer;
  logoBj: string | ArrayBuffer;
  logo24M: string | ArrayBuffer;
  logoGrc: string | ArrayBuffer;
  n: number;
  carreraxUser;
  codigoDoc;
  m;
  invitado;
  loading: boolean;
  documento: any;
  editable: boolean;
  blobPdf: Blob;
  constructor(private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private http: HttpClient,
    public service: ServicioService,
    public router: Router) {
    this.solicitud = JSON.parse(sessionStorage.getItem('solicitud-titulacion')) || new SolicitudesTitulacion();
    if (!this.solicitud.listaIng || this.solicitud.listaIng.length === 0) {
      this.solicitud.listaIng = []
      this.solicitud.listaIng.push(new Ing());
    }
  }
  agregarCatalogo() {
    this.solicitud.listaIng.push(new Ing())
  }
  selectDestinatario(item) {
    this.destinatario = item.name
  }
  evento(e) {
    const x = e.target.value;
    //console.log('Esto es x_:', x);
  }
  ngOnInit() {
    //this.loading = true;
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
    if (nombre&&apellido) {
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
    element = nombre +' '+ apellido;
    getdatos[i].name = element;
    }
    if (!nombre&&apellido) {
      apellido='';
      nombre=arrayNombre[0];
      nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      element = nombre;
      getdatos[i].name = element;
    }

          //console.log(element);
        }
      this.listaProf = getdatos},
      (error: HttpErrorResponse) => { console.log(error.message) })
    this.obtenerFecha();
    this.fecha = this.formBuilder.group({
      fecha: ''
    })
    this.obtenerfechaS();
    this.fechaS = this.formBuilder.group({
      fechaS: ''
    })
    this.solicitud.codigoDocumento = 'SOL-';
    this.solicitudCodigoDocumento = 'SOL-';
    this.getLocalStorageData();
    if (this.documento) {
      this.solicitudCodigoDocumento = this.documento.codigo_documento;
      this.loading = false;
      this.editable = true;
    }
    else {
      this.loading = true;
      this.editable = false;
      this.constaEnCarrera();
    }
  }

  imagenUriYav() {
    //logoYav
    this.http.get('/assets/logoYav.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const x = reader.result;
          this.logoYav = x;
          this.solicitud.logoPic = this.logoYav;
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
          this.solicitud.logoPic = this.logoBj;
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
          this.solicitud.logoPic = this.logoGrc;
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
          this.solicitud.logoPic = this.logo24M;
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
    if (nombre&&apellido) {
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
    this.usuario.name = nombre +' '+ apellido;
    }
    if (!nombre&&apellido) {
      apellido='';
      nombre=arrayNombre[0];
      nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      this.usuario.name = nombre;
    }

    this.usuario.codigoUser = x.codigoUser;
    //console.log('USUARIO.CODIGO_USER_: ',this.usuario.codigoUser);
    this.solicitud.idUsuario = this.usuario.id;
    this.solicitud.codigoUsuario = this.usuario.codigoUser;
    let doc_string = localStorage.getItem("currentDoc");
    let doc = JSON.parse(doc_string);
    this.documento = doc;
    //console.log(this.usuario.id, this.usuario.codigoUser);
    //console.log('user_string_:', user_string);
    //console.log('documento_: ', this.documento.codigo_documento);
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
      this.invitado = 'no';
      this.generarCodigo();
    },
      error => {
        this.invitado = 'si';
        this.generarCodigoInvitado();
      }
    )
  }
  generarCodigo() {
    var carrera_id = this.carreraxUser;
    if (this.n > 1) {
      //console.log('generarCodigo()_:', this.solicitudCodigoDocumento, this.solicitud.codigoDocumento)
      this.solicitudCodigoDocumento = this.solicitud.codigoDocumento + 'ITSYAV-' + this.dateS + '-';
      this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior Yavirac'
      //console.log('hola yavirac' + this.solicitud.InstitutoPertenciciente)
      this.imagenUriYav();
      //console.log('esto es ', this.usuario.name)
    } else
      if (this.n == 1) {
        if (carrera_id == 1) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITSBJ-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior "Benito Juarez"'
          this.imagenUriBj();
        }
        if (carrera_id == 2) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITS24M-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = '"Instituto Tecnológico Superior "24 de Mayo"'
          this.imagenUri24M();
        }
        if (carrera_id == 3) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITSGC-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior "Gran Colombia"'
          this.imagenUriGrc();
        }
        if (carrera_id == 4) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITSYAVAC-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior "Yavirac"'
          this.imagenUriYav();
        }
        if (carrera_id == 5) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITSYAV-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior "Yavirac"'
          this.imagenUriYav();
        }
        if (carrera_id == 6) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITSYAV-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior "Yavirac"'
          this.imagenUriYav();
        }
        if (carrera_id == 7) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITSYAV-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior "Yavirac"'
          this.imagenUriYav();
        }
        if (carrera_id == 8) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITSYAV-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior "Yavirac"'
          this.imagenUriYav();
        }
        if (carrera_id == 9) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITSBJ-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior "Benito Juarez"'
          this.imagenUriBj();;
        }
        if (carrera_id == 10) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITSYAV-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior "Yavirac"'
          this.imagenUriYav();
        }
        if (carrera_id == 11) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITSYAV-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior "Yavirac"'
          this.imagenUriYav();
        }
        if (carrera_id == 12) {
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'ITSGC-' + this.dateS + '-';
          this.solicitud.InstitutoPertenciciente = 'Instituto Tecnológico Superior "Gran Colombia"'
          this.imagenUriGrc();
        }
      }
    this.comprobarDocumentosExistentes();
  }
  generarCodigoInvitado() {
    this.solicitudCodigoDocumento = 'GEDI-';
    this.solicitud.codigoDocumento = 'GEDI-'
    //console.log(this.solicitud.codigoDocumento);
    this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 'INVITADO-' + this.dateS + '-';
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
          //console.log('Sii es invitado');
          this.generarNumeracionDocumentoInvitado();
          this.loading = false;
        }
      } else {
        //console.log('NO Existen Documentos!!');
        this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 1;
        this.solicitud.codigoDocumento = this.solicitudCodigoDocumento;
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
      n = t.includes('SOL');
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
      this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 1;
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
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + k;
          this.solicitud.codigoDocumento = this.solicitudCodigoDocumento;

        }
      }
      //

    }
    //console.log('codigo_documento_generado:', this.solicitudCodigoDocumento, this.solicitud.codigoDocumento)
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
      this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + 1;
    } else {
      //console.log('AÑADIENDO DOCS INVITADO!!');
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
          this.solicitudCodigoDocumento = this.solicitudCodigoDocumento + k;
          this.solicitud.codigoDocumento = this.solicitudCodigoDocumento;

        }
      }
      //

    }
    //console.log('codigo_documento_generado:', this.solicitudCodigoDocumento, this.solicitud.codigoDocumento)
  }

  ///////////////////////Fin de métodos escenciales////////////////////////
  ///////////////////////Comienza generación de PDF////////////////////////
  guardarBorrador() {
    sessionStorage.setItem('solicitud-titulacion', JSON.stringify(this.solicitud));
  }
  publicarEnGedi() {
    const defenicionSolicitud = this.getDefinicionSolicitud();
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
        } else {
          alertify.notify('Cancelado!', 'error', 2);
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
    formData.append("upload", file);
    formData.append("codDoc", this.solicitudCodigoDocumento);
    formData.append("codUser", this.usuario.codigoUser);
    formData.append("idUser", this.usuario.id.toString());

    this.service.setDocumento(formData);
    //console.log('ANTES_DE_:', this.solicitudCodigoDocumento)
    this.solicitudCodigoDocumento = '';
    //console.log('ANTES_DE_:', this.solicitud.codigoDocumento)
    this.solicitud.codigoDocumento = '';
    setTimeout(() => {
      this.ngOnInit();
      //console.log('Page reload!!');
    }, 5000);//1000ms=1Sec
  }
  publicarEditado() {
    const defenicionSolicitud = this.getDefinicionSolicitud();
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
  publicarEdit(){
    //console.log('publicarEdit_::', this.blobPdf);
    const formData = new FormData();
    const file = new File([this.blobPdf], 'docEdit.pdf', { type: 'application/pdf' });
    //console.log(file);    
    formData.append("cod", this.solicitudCodigoDocumento);
    formData.append("upload", file);
    this.service.updatePdf(formData);
    //console.log('ANTES_DE_:', this.solicitudCodigoDocumento)
    this.solicitudCodigoDocumento = '';
    //console.log('ANTES_DE_:', this.solicitud.codigoDocumento)
    this.solicitud.codigoDocumento = '';
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
  //Fin de Metodos Nuevos y actualizaciones!!
  resetearForm() {
    this.solicitud = new SolicitudesTitulacion();
    sessionStorage.removeItem('solicitud-titulacion');
  }
  getObjectoDocumento(listaIng: Ing[]) {
    return {
      columns: [
        ...listaIng.map(ed => {
          //console.log('Esto es catologo', ed.catalogo)
          return [ed.catalogo]
        })
      ]
    }

  }
  getDefinicionSolicitud() {
    sessionStorage.setItem('solicitud-titulacion', JSON.stringify(this.solicitud));
    return {

      content: [
        {
          columns: [
            [{
              image: this.solicitud.logoPic,
              width: 100,
              height: 75,
              style: 'img',
              alignment: 'left'
            },
            ]
          ]
        },
        {
          columns: [
            [{
              text: this.solicitud.InstitutoPertenciciente,
              bold: true,
              fontSize: 20,
              alignment: 'center',
              margin: [20, 20, 20, 20]
            }]
          ]
        },
        {
          canvas: [{ type: 'line', x1: 0, y1: 3, x2: 590 - 2 * 30, y2: 3, lineWidth: 3 }]
        },


        {
          columns: [
            [{
              text: 'Solicitud Proyecto Titulación',
              style: 'titulo',
              margin: [20, 20, 20, 20]
            }]
          ]
        },
        {
          columns: [
            [{
              text: this.solicitudCodigoDocumento,
              bold: true,
              fontSize: 12,
              alignment: 'center'
            }]
          ]
        },
        ,
        {
          columns: [
            [{
              text: this.solicitud.sumillas + ':' + this.date,
              style: 'sumillas'
            }]
          ]

        },
        {
          columns: [
            [{
              text: `Destinatario :${this.destinatario}`,
              style: 'destinatario'
            }]
          ]
        },
        {
          columns: [
            [{
              text: ' Yo : ' + this.usuario.name + " " + 'Con "C.I." ' + this.usuario.user_name + " "
                + " " + this.solicitud.cuerpo + ' ' + this.solicitud.titulacion
              , style: 'presentacionSolicitante'
            }]
          ]
        },
      /* {
        columns:[
          [{
            text:this.solicitud.cuerpo+''+this.solicitud.titulacion,
            style:'cuerpo'
          }]
        ]
      } */,
      /* {
        columns:[
          [{
            text:this.solicitud.titulacion,
            style:'titulacion'
          }]
        ]
      } */,
        {
          columns: [
            [{
              text: 'Atentamente:' + '' + '' + this.usuario.name,
              style: 'despedida'
            }]
          ]
        },
        {
          columns: [
            [{
              text: this.usuario.name,
              style: 'nombre'
            }]
          ]
        },
        {
          columns: [
            [{
              text: this.usuario.user_name,
              style: 'cedula'
            }]
          ]
        }
      ],
      info: {
        title: this.usuario.name + '_Solicitud',
        author: this.usuario.name,
        subject: 'Solicitud',
        keywords: 'Solicitud, Solicitud ONLINE',
      },
      styles: {
        sumillas: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 10],
          /*decoration:'underline'*/
        },
        destinatario: {
          fontSize: 14,
          margin: [0, 20, 0, 10],
          bold: true
        },
        presentacionSolicitante: {
          fontSize: 14,
          margin: [0, 20, 0, 10]
        },
        cuerpo: {
          fontSize: 14,
          margin: [0, 20, 0, 10]
        },
        despedida: {
          fontSize: 14,
          margin: [0, 20, 0, 10],
          alignment: 'center'
        },
        fecha: {
          fontSize: 14,
          margin: [0, 20, 0, 10]
        },
        titulacion: {
          fontSize: 14,
          margin: [0, 20, 0, 10],
          bold: true
        },
        titulo: {
          alignment: 'center',
          fontSize: 14,
          margin: [0, 0, 0, 20],
          bold: true
        },
        num: {
          alignment: 'center',
          fontSize: 14,
          margin: [0, 0, 0, 20],
          bold: true
        },
        nombre: {
          alignment: 'center',
          fontSize: 14,
          margin: [0, 0, 0, 20],
          bold: true
        },
        cedula: {
          alignment: 'center',
          fontSize: 14,
          margin: [0, 0, 0, 20],
          bold: true
        }
      }
    }
  }
}