import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Resume, Experience, Education, Skill } from '../../models/resume';
import { FormBuilder } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { ServicioService } from 'src/app/servicio.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userData';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare let alertify: any;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-hoja-de-vida',
  templateUrl: './hoja-de-vida.component.html',
  styleUrls: ['./hoja-de-vida.component.css']
})
export class HojaDeVidaComponent implements OnInit {
  selectedItem: string;
  resume = new Resume();
  degrees = ['Básico', 'Inicial', 'Bachillerato', 'Estudios Superiores'];
  date: any;
  fecha: any;
  dateS: any;
  fechaS: any;
  usuario: UserData;
  dialog: any;
  hdvCodigoUsuario: string;
  codigoGet: string;
  numeroActual: number;
  numeroSiguiente: number;
  listaDocumentos: any[] = [];
  InstitutoPertenciciente: string
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
    public service: ServicioService,
    public router: Router) {

    this.resume = JSON.parse(sessionStorage.getItem('hoja-de-vida')) || new Resume();
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }

  }

  ngOnInit() {
    this.loading = true;
    this.n = 0;
    this.obtenerFecha();
    this.fecha = this.formBuilder.group({
      fecha: ''


    })

    this.obtenerfechaS();
    this.fechaS = this.formBuilder.group({
      fechaS: ''
    })
    this.resume.codigoDocumento = 'HDV-'
    this.hdvCodigoUsuario = 'HDV-'
    this.getLocalStorageData();
    if (this.documento) {
      this.hdvCodigoUsuario = this.documento.codigo_documento;
      this.loading = false;
      this.editable = true;
    }
    else {
      this.loading = true;
      this.editable = false;
      this.constaEnCarrera();
    }  }

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
    //console.log(this.usuario.codigoUser);
    this.resume.idUsuario = this.usuario.id;
    this.resume.codigoUsuario = this.usuario.codigoUser;
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
      //console.log('generarCodigo()_:', this.hdvCodigoUsuario, this.resume.codigoDocumento)
      this.hdvCodigoUsuario = this.resume.codigoDocumento + 'ITSYAV-' + this.dateS + '-';
      //console.log('ifMayor1_:', this.solicitudCodigoDocumento);
    } else
      if (this.n == 1) {
        if (carrera_id == 1) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITSBJM-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 2) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITS24M-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 3) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITSGC-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 4) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 5) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 6) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 7) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 8) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITSYAVELT-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 9) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITSBJ-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 10) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 11) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITSYAV-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
        if (carrera_id == 12) {
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'ITSGC-' + this.dateS + '-';
          //console.log('Carrera_:', this.solicitudCodigoDocumento)
        }
      }
    this.comprobarDocumentosExistentes();
  }
  generarCodigoInvitado() {
    this.hdvCodigoUsuario = 'GEDI-';
    this.resume.codigoDocumento = 'GEDI-'
    //console.log(this.resume.codigoDocumento);
    this.hdvCodigoUsuario = this.hdvCodigoUsuario + 'INVITADO-' + this.dateS + '-';
    //this.resume.logoPic=this.logoYav;
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
        this.hdvCodigoUsuario = this.hdvCodigoUsuario + 1;
        this.resume.codigoDocumento = this.hdvCodigoUsuario;
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
      n = t.includes('HDV');
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
      this.hdvCodigoUsuario = this.hdvCodigoUsuario + 1;
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
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + k;
          this.resume.codigoDocumento = this.hdvCodigoUsuario;

        }
      }
      //

    }
    //console.log('codigo_documento_generado:', this.hdvCodigoUsuario, this.resume.codigoDocumento)
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
      this.hdvCodigoUsuario = this.hdvCodigoUsuario + 1;
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
          this.hdvCodigoUsuario = this.hdvCodigoUsuario + k;
          this.resume.codigoDocumento = this.hdvCodigoUsuario;

        }
      }
      //

    }
    //console.log('codigo_documento_generado:', this.hdvCodigoUsuario, this.resume.codigoDocumento)
  }

  ///////////////////////Fin de métodos escenciales////////////////////////
  ///////////////////////Comienza generación de PDF////////////////////////
  guardarBorrador() {
    sessionStorage.setItem('solicitud-titulacion', JSON.stringify(this.resume));
  }
  publicarEnGedi() {
    const defenicionSolicitud = this. getDocumentDefinition();
    const pdf = pdfMake.createPdf(defenicionSolicitud);
    pdf.getBlob(async (blob) => {
      this.blobPdf = blob;
      await this.blobPdf;})
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
  //Métodos a usar
  addExperience() {
    this.resume.experiences.push(new Experience());
  }
  addEducation() {
    this.resume.educations.push(new Education());
  }
  publicar() {
    const formData = new FormData();
    const file = new File([this.blobPdf], 'doc.pdf', { type: 'application/pdf' });
    //console.log('Antes_del_Append_file_: ',file,'document.pdf');

    formData.append("upload", file);
    formData.append("codDoc", this.hdvCodigoUsuario);
    formData.append("codUser", this.usuario.codigoUser);
    formData.append("idUser", this.usuario.id.toString());

    this.service.setDocumento(formData);
    //console.log('ANTES_DE_:', this.solicitudCodigoDocumento)
    this.hdvCodigoUsuario = '';
    //console.log('ANTES_DE_:', this.solicitud.codigoDocumento)
    this.resume.codigoDocumento = '';
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
  publicarEdit(){
    //console.log('publicarEdit_::', this.blobPdf);
    const formData = new FormData();
    const file = new File([this.blobPdf], 'docEdit.pdf', { type: 'application/pdf' });
    //console.log(file);    
    formData.append("cod", this.hdvCodigoUsuario);
    formData.append("upload", file);
    this.service.updatePdf(formData);
    //console.log('ANTES_DE_:', this.solicitudCodigoDocumento)
    this.hdvCodigoUsuario = '';
    //console.log('ANTES_DE_:', this.solicitud.codigoDocumento)
    this.resume.codigoDocumento = '';
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
    alertify.notify('Edición Cancelada!','error',10);
  }
  backToHome() {
    localStorage.removeItem('currentDoc');
    this.router.navigate(["/visualizador"]);    
    alertify.notify('De vuelta en el Visualizador!','success',10);
  }
  //Fin de Metodos Nuevos y actualizaciones!!
  resetForm() {
    this.resume = new Resume();
    sessionStorage.removeItem('hoja-de-vida');
  }
  getDocumentDefinition() {
    sessionStorage.setItem('hoja-de-vida', JSON.stringify(this.resume));
    return {
      content: [
        {
          text: 'Hoja de Vida',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.hdvCodigoUsuario,
              style: 'num'
            }]
          ]
        },
        {
          columns: [
            [{
              text: this.usuario.name,
              style: 'name'
            },
            {
              text: this.resume.address
            },
            {
              text: 'Email : ' + this.usuario.email,
            },
            {
              text: 'Teléfono : ' + this.resume.contactNo,
            },
            {
              text: 'Usuario GitHub: ' + this.resume.socialProfile,
              link: this.resume.socialProfile,
              color: 'green',
            }
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        {
          text: 'Habilidades',
          style: 'header'
        },
        {
          columns: [
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
              ]
            },
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
              ]
            },
            {
              ul: [
                ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
              ]
            }
          ]
        },
        {
          text: 'Experiencia',
          style: 'header'
        },
        this.getExperienceObject(this.resume.experiences),
        {
          text: 'Educación',
          style: 'header'
        },
        this.getEducationObject(this.resume.educations),
        {
          text: 'Otros Detalles',
          style: 'header'
        },
        {
          text: this.resume.otherDetails
        },
        {
          text: 'Firma',
          style: 'sign'
        },
        {
          columns: [
            { qr: this.usuario.name + ', Teléfono de contacto : ' + this.resume.contactNo, fit: 100 },
            {
              text: `${this.usuario.name}`,
              alignment: 'right',
            }
          ]
        }
      ],
      info: {
        title: this.usuario.name + '_Hoja De Vida',
        author: this.usuario.name,
        subject: 'HDV',
        keywords: 'HDV, ONLINE HDV',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };
  }
  getExperienceObject(experiences: Experience[]) {
    const exs = [];
    experiences.forEach(experience => {
      exs.push(
        [{
          columns: [
            [{
              text: experience.jobTitle,
              style: 'jobTitle'
            },
            {
              text: experience.employer,
            },
            {
              text: experience.jobDescription,
            }],
            {
              text: 'Experiencia : ' + experience.experience + ' Meses',
              alignment: 'right'
            }
          ]
        }]
      );
    });
    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }
  getEducationObject(educations: Education[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Grado',
            style: 'tableHeader'
          },
          {
            text: 'Universidad',
            style: 'tableHeader'
          },
          {
            text: 'Año que Cursa',
            style: 'tableHeader'
          },
          {
            text: 'Porcentaje',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [ed.degree, ed.college, ed.passingYear, ed.percentage];
          })
        ]
      }
    };
  }
  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic,
        width: 75,
        alignment: 'right'
      };
    }
    return null;
  }
  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      //console.log('Error: ', error);
    };
  }
  addSkill() {
    this.resume.skills.push(new Skill());
  }

}