import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { Oficios } from '../../models/oficios';
pdfMake.vfs=pdfFonts.pdfMake.vfs
@Component({
  selector: 'app-oficios',
  templateUrl: './oficios.component.html',
  styleUrls: ['./oficios.component.css']
})
export class OficiosComponent implements OnInit {
oficios= new Oficios();
  constructor() { 
    this.oficios=JSON.parse(sessionStorage.getItem('oficios')) || new Oficios();
  }
  
  ngOnInit(): void {
  }
    generarPdf(action='open'){
     const definicionDocumento=this.getDocumentoDefinicion();
     switch(action){
       case 'open':pdfMake.createPdf(definicionDocumento).open(); break;
       case 'print':pdfMake.createPdf(definicionDocumento).print(); break;
       case 'download':pdfMake.createPdf(definicionDocumento).download(); break;
      default: pdfMake.createPdf(definicionDocumento).open(); break
     }
   
    }
    resetearForm(){
      this.oficios= new Oficios();
    }
    getDocumentoDefinicion(){
      sessionStorage.setItem('oficios',JSON.stringify(this.oficios));
       return{
         content:[
           {
             text:'Oficios',
             bold:true,
             fontSize:20,
             alignment:'center',
             margin:[0,0,0,20]
           },
           {
             columns:[
               [{
                 text:this.oficios.fecha,
                 style:'fecha'
               }]
             ]
           },
           {
             columns:[
               [{
                 text:this.oficios.lugar,
                 style:'lugar'
               }]
             ]
           },
           {
             columns:[
               [{
                 text:this.oficios.numeroOficio,
                 style:'numeroO'
               }]
             ]
           },
           {
             columns:[
             [{
               text:this.oficios.destinatario,
               style:'destinatario'
             }]
            ]
           },
           {
             columns:[
               [{
                 text:this.oficios.asunto,
                 style:'asunto'
               }]
             ]
           },
           {
             columns:[
               [{
                 text:this.oficios.cuerpo,
                 style:'cuerpo'
               }]
             ]
           },
           {
            columns:[
              [{
                text:this.oficios.despedida,
                style:'despedida'
              }]
            ] 
           },
           {
             columns:[
             [{
               text:this.oficios.firma,
               style:'firma'
             }]
            ]
           }
         ],
         /*info:{
           title:this.oficios.asunto,
           author:this.oficios.asunto,
           subject:'OFICIO',
           keywords:'OFICIO , EN LINEA OFICIO',
         },*/
         styles:{
           fecha:{
          alignment:'right',
          fontSize:14,
          margin:[0,0,0,20]
        },
        lugar:{
          alignment:'right',
          fontSize:14,
          margin:[0,0,0,20]
        },
        numeroO:{
          fontSize:14,
          margin:[0,0,0,20],
          bold:true
        },
        destinatario:{
          fontSize:14,
          margin:[0,0,0,20],
          bold:true
        },
        asunto:{
          fontSize:14,
          margin:[0,0,0,20]
        },
        cuerpo:{
          fontSize:14,
          margin:[0,20,0,10]
        },
        despedida:{
          fontSize:14,
          margin:[0,20,0,10]
         },
         firma:{
          fontSize:14,
          margin:[0,20,0,10] 
         }
         }
         

       }   
    } 

}