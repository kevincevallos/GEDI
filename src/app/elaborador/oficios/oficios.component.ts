import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { Oficios ,Ordenado} from '../../models/oficios';
import {FormBuilder} from '@angular/forms'
import{DatePipe} from '@angular/common'
pdfMake.vfs=pdfFonts.pdfMake.vfs
@Component({
  selector: 'app-oficios',
  templateUrl: './oficios.component.html',
  styleUrls: ['./oficios.component.css']
})
export class OficiosComponent implements OnInit {
oficios= new Oficios();

listaProf = ['Ing.Mauricio Tamayo','Ing.Lorena Chulde'];
date:any;
fecha:any
  constructor(private FormBuilder:FormBuilder,
    public datepipe:DatePipe) { 
    this.oficios=JSON.parse(sessionStorage.getItem('oficios')) || new Oficios();
 if(!this.oficios.ordenDelDia||this.oficios.ordenDelDia.length===0){
   this.oficios.ordenDelDia=[];
   this.oficios.ordenDelDia.push(new Ordenado());
 }
  }
  agregarCatalogo(){
    this.oficios.ordenDelDia.push(new Ordenado())
  }
  evento(e){
const x = e.target.value;
console.log('Esto es x_:',x);
  }
  ngOnInit(){
    this.obtenerFecha();
    this.fecha=this.FormBuilder.group({
      fecha:''
    })
  }
  obtenerFecha(){
    this.date=new Date()
    this.date=this.datepipe.transform(this.date,'yyyy-MM-dd')
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
      sessionStorage.removeItem('oficios');

    }
   getObjectoDocumento(ordenDelDia:Ordenado[]){
    //console.log('hola') 
  return{
    columns: [
        ...ordenDelDia.map(ed => {
          console.log('Esto es catálogo_:',ed.catalogo)
          return [ed.catalogo];
        })
      
      ]
     /*  columns:[
        [{
          text:this.getObjectoDocumento(this.oficios.ordenDelDia),
          style:'destinatario'
        }]
      ],
       ...ordenDelDia.map(ed=>{
         return[ed.catalogo]
       }) */
     };
   }
    getDocumentoDefinicion(){
      var fecha=this.date
      console.log('fecha()',fecha)
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
                text:'Instituto Tecnologico Superior "Segun el usuario"',
                style:'titulo'
              }]
            ]
          },
          {
            columns:[
              [{
                text:'Oficio N°2 2020-ITSBJ',
                style:'num'
              }]
            ]
          },
           {
             columns:[
               [{
                 text:this.date,
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
             
            text: 'Destinatario',
            style: 'destinatario'
          },
          this.getObjectoDocumento(this.oficios.ordenDelDia),
           {
             columns:[
               [{
                 text: this.oficios.asunto,
                 style:'asunto'
               }]
             ]
           },
           {
             columns:[
               [{
                 text: 'Por medio de un oficio hago saber '  + this.oficios.cuerpo,
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
               text: 'Reciba un cordial saludo, atentamente'+ '"Nombre del Usuario"',
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
        titulo:{
         alignment:'center',
         fontSize:14,
         margin:[0,0,0,20],
         bold:true
        },
        num:{
          alignment:'center',
          fontSize:14,
          margin:[0,0,0,20],
          bold:true
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
          margin:[0,10,10,10],
          bold:true
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
          margin:[0,20,0,10],
          alignment:'center',
          bold:true 
         },
         }
         }
         

       }   
    } 