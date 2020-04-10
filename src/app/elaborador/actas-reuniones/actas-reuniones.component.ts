import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import { ActasReuniones, Orden, Docentes } from 'src/app/models/actas-reuniones';
import { DatePipe } from '@angular/common'
import { sign } from 'crypto';
import { HttpErrorResponse } from '@angular/common/http';
import { ServicioService } from 'src/app/servicio.service';

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

  listaInvolucrados = []

  constructor(public datepipe: DatePipe,
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
    this.service.getDocentes().subscribe(
      (getdatos:any[]) =>  this.listaDocentes = getdatos ,
      (error: HttpErrorResponse) => { console.log(error.message)},
      ()=> console.log('peticion Finalizada',this.listaDocentes))

    this.obtenerFecha()
    
  }
  
  //metodos a usar

  obtenerFecha() {
    this.date = new Date();
    this.date = this.datepipe.transform(this.date, 'dd-MM-yyyy');
    return this.date;
  }

  selectCoordinador(item) {
      this.reunion.coordinador = item.name
  }
 /*  selectCoordinador(val: string): string[] {
    return this.listaDocentes.map(x => x.name).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  } */

  selectSecretaria(item) {
      this.reunion.secretaria = item.name
  }

  selectInvolucrados(item) {
    this.listaInvolucrados.push(item.name)
    console.log('listaInvolucrados_:',this.listaInvolucrados)
  }

  selectRevisado(item){
    this.reunion.revisado = item.nombre 
  }

  selectAprobadoUno(item){
    this.reunion.aprobadoUno = item.nombre
  }

  selectAprobadoDos(item){
    this.reunion.aprobadoDos = item.nombre
  }
  selectAprobadoTres(item){
    this.reunion.aprobadoTres = item.nombre
  }
  selectAprobadoCuatro(item){
    this.reunion.aprobadoCuatro = item.nombre
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
  }

  getDocumentDefinition() {
    sessionStorage.setItem('acta-reunion', JSON.stringify(this.reunion));
    return {
      content: [
        {
          image: ''
          ,fit: [50, 50]
        },
        {
          text: 'Instituto el cual pertenece el usuario',
          
          style : 'titulo'
        },
        {
          text: 'ACTA DE REUNIÓN',
          style : 'titulo'
        },
        {
          text: 'ACTA-ISTBJ-2020-001',
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

  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

}