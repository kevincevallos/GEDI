import { Component, OnInit } from '@angular/core';
import { Actas, Orden } from 'src/app/models/actas';
import pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.css']
})
export class ActasComponent implements OnInit {
  
  acta = new Actas();

  constructor() {

    
    this.acta = JSON.parse(sessionStorage.getItem('acta')) || new Actas();
    if (!this.acta.ordenDelDia || this.acta.ordenDelDia.length === 0) {
      this.acta.ordenDelDia = [];
      this.acta.ordenDelDia.push(new Orden());
    }
  }

  ngOnInit(): void {
  }
  
  //metodos a usar

  agregarOrden () {
    this.acta.ordenDelDia.push(new Orden())
  }

  resetForm() {
    this.acta = new Actas();
    sessionStorage.removeItem('acta');
  }

  getDocumentDefinition() {
    sessionStorage.setItem('acta', JSON.stringify(this.acta));
    return {
      content: [
        {
          text: 'Instituto el cual pertenece el usuario',
          
          style : 'titulo'
        },
        {
          text: this.acta.titulo,
          style : 'titulo'
        },
        {
          text: 'ACTA NO 2-2019-ISTBJ',
          style : 'titulo'
        },
        {
          text: this.acta.inicio,
          style: 'body'
        },
        {
          text: 'Orden del Dia',
          style: 'subTitulo'
        },
        {
          ul : [
            ...this.acta.ordenDelDia.filter((orden, index) => index % 3 === 0).map(o => o.orden)
          ]
        },
        {
          ul : [
            ...this.acta.ordenDelDia.filter((orden, index) => index % 3 === 1).map(o => o.orden)
          ]
        },
        {
          ul : [
            ...this.acta.ordenDelDia.filter((orden, index) => index % 3 === 2).map(o => o.orden)
          ]
        },
        {
          text: 'Desarrollo',
          style: 'subTitulo'
        },
        {
          text: this.acta.desarrollo,
          style: 'body'
        },
        
        {
          text: this.acta.despedida,
          fontSize: 12,
          margin : [5 , 20 , 5 ,60]
        },
        {
          text: `"Nombre del usuario logeado en el sistema"`,
          style: 'pie'
        },
        {
          text: `"Carrera del usuario"`,
          style: 'pie'
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