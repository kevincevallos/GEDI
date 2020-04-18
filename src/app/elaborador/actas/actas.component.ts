import { Component, OnInit } from '@angular/core';
import { Actas, Orden } from 'src/app/models/actas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import {FormBuilder} from '@angular/forms';
import {DatePipe} from '@angular/common'
import { ServicioService } from 'src/app/servicio.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userData';
pdfMake.vfs=pdfFonts.pdfMake.vfs
@Component({
  selector: 'app-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.css']
})
export class ActasComponent implements OnInit {
  
  acta = new Actas();
  fecha:any;
  dateS:any;
  fechaS:any;
  usuario:UserData;
  dialog: any;
  actaCodigoUsuario:string;
  codigoGet:string;
  numeroActual:number;
  numeroSiguiente:number;
  listaDocumentos:any[]=[];
  constructor(private formBuilder:FormBuilder,
    public datepipe:DatePipe,
    public service: ServicioService,
    public router:Router) {
    
    this.acta = JSON.parse(sessionStorage.getItem('acta')) || new Actas();
    if (!this.acta.ordenDelDia || this.acta.ordenDelDia.length === 0) {
      this.acta.ordenDelDia = [];
      this.acta.ordenDelDia.push(new Orden());
    }
  }

  ngOnInit(){
    this.service.getUsers().subscribe(
      (getdatos:any[])=>this.listaDocumentos=getdatos,
      (error: HttpErrorResponse  )=>{console.log(error.message)})
     this.obtenerFechaS()
     this.acta.codigoDocumento='ACT-';
     this.generar()
     this.generarCodigo();
    }
   generar(){
    let user_string=localStorage.getItem("currentUser");
    let user=JSON.parse(user_string);
    var x=user;
   this.usuario=x; 
   }

   generarCodigo(){
    var carrera_usuario_id
    if(this.usuario.id){
      var n:number=0;
      var carrera_id;
      var codigoDoc;
      this.service.findById(this.usuario).subscribe(data=>{
        carrera_id=data[0].carrera_id;
        for(const key in data){
          if(data.hasOwnProperty(key))
          n++
        }
      if(n>1){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.YAV-'+this.dateS+'-'
      }
      if(n==1){
        if(carrera_id==1){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.B.J.M-'+this.dateS+'-'
      }
      if(carrera_id==2){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.24.M.K-'+this.dateS+'-'
      }
      if(carrera_id==3){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.G.C.M-'+this.dateS+'-'
      }
      if(carrera_id==4){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.YAV.AC.V-'+this.dateS+'-'
      }
      if(carrera_id==5){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.YAV.GT.M-'+this.dateS+'-'
      }
      if(carrera_id==6){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.YAV.MK-'+this.dateS+'-'
      }
      if(carrera_id==7){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.YAV.ELT.N-'+this.dateS+'-'
      }
      if(carrera_id==8){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.YAV.ELT.V-'+this.dateS+'-'
      }
      if(carrera_id==9){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.B.J.V-'+this.dateS+'-'
      }
      if(carrera_id==10){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.YAV.AC.M-'+this.dateS+'-'
      }
      if(carrera_id==11){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.YAV.GT.V-'+this.dateS+'-'
      }
      if(carrera_id==12){
        this.actaCodigoUsuario=this.acta.codigoDocumento+'I.T.S.DM.V-'+this.dateS+'-'
      }
    }
      this.service.getDocumentos().subscribe(data=>{
        codigoDoc=data['datos'];
        var m;
        if (!codigoDoc) {
          console.log('No hay docs')
          this.actaCodigoUsuario=this.actaCodigoUsuario+1;

         }
       for (let i=0;i<codigoDoc.length;i++){
         var t=codigoDoc[i].codigo_documento;
         var elemento=codigoDoc[i];
         console.log(t)
         var n=t.includes('ACT')
         console.log(n);
         if(n){
           this.listaDocumentos.push(elemento);
         }
       }
       for (let m = 0; m < this.listaDocumentos.length; m++) {
        const element = this.listaDocumentos[m];
        console.log('listaDocumentos_:',element);
        
      }
      this.listaDocumentos.forEach(element => {
        //console.log('ELEMENT_:',element);

        m=element.codigo_documento;
        this.codigoGet=m;
        
      });
     
      var long=this.codigoGet.length;
      console.log('long_:',long);
      var cad2= m.slice(-1);
      var cad3 = m.slice(-2);
      var cad4 = m.slice(-3);
      if (cad3>10&&cad3<100) {
        console.log('cad3_:',cad3)
        cad2 = m.slice(-2);
        console.log('cad2_:',cad2);
      }
      if (cad4>100&&cad3<1000) {
       cad2 = m.slice(-3);
      }
      console.log('antes_del_if_:',cad2);
      //cad2 = +cad2;
      if (cad2==0) {
        cad2 = m.slice(-2);
        console.log('if_cad2_:',cad2);

     }
     if (cad3==0) {
       cad2 = m.slice(-3);
        console.log('if_cad2_:',cad2);
     }
      this.numeroActual=cad2;
     // parseInt(cad2);
      console.log('getDocumentos()_:',this.codigoGet);
      console.log(cad2,this.numeroActual);

      var x;
      // console.log('aleatorio',num)
       for(var y=1 ; y<=1000;y++){
         //num[y]=y;
         //y=3
         //numeroActual=2
         x = y;
         //x=2
         //console.log('x_:',x)
         if (this.numeroActual==x) {
           x++
           var k=x;
           console.log('k_:',k)
           this.actaCodigoUsuario=this.actaCodigoUsuario+k;
         }
         //console.log('num_:',num[x]);
       }


   },
   //this.navigateToLogin()
   error => {
      //alert('Error FindById()');
       console.log('error_postUsuario_:', error)
   }
 )

    //var num:number[]=[];

   //this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+x;
 //this.solicitudCodigoUsuario=this.solicitudCodigoUsuario+num[x];
         // this.usuario.codigoUser=this.solicitudCodigoUsuario;
 console.log('codigo_:',this.actaCodigoUsuario) 

   },
    )
  }
}

  //metodos a usar
obtenerFechaS(){
  this.dateS=new Date()
  this.dateS=this.datepipe.transform(this.dateS,'yyyy')
}
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