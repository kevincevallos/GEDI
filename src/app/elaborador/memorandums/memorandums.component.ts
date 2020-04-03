import { Component, OnInit } from '@angular/core';
import { Memorandums} from 'src/app/models/memorandums';
import pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-memorandums',
  templateUrl: './memorandums.component.html',
  styleUrls: ['./memorandums.component.css']
})
export class MemorandumsComponent implements OnInit {

  memo = new Memorandums()

  constructor() { 
    this.memo=JSON.parse(sessionStorage.getItem('memo')) || new Memorandums();

  }

  ngOnInit(): void {
  }

  //metodos  a usar


  getDocumentDefinition() {
    sessionStorage.setItem('memo', JSON.stringify(this.memo));
    return {
      content: [
        {
          text: 'Instituto el cual pertenece el usuario',
          
          style : 'titulo'
        },
        {
          text: `MEMORANDUM "ISTBJ-DS-001-2020" `,
          style : 'titulo'
        },
        {
          columns: [
            [
            {
              text: `De : "Nombre del usuario logeado en el sistema"`,
              style: 'cabecera'
            },
            {
              text: `Para : ${this.memo.para}`,
              style: 'cabecera'
            },
            {
              text: `Asunto: ${this.memo.asunto}`,
              style: 'cabecera'
            },
            {
              text: `Fecha: ${this.memo.fecha}`,
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
          margin : [0 , 40 , 0 ,60]
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
            upperCase: true ,
            alignment: 'center',
            textTransform : 'uppercase'
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
  resetForm() {
    this.memo = new Memorandums();
  }

}