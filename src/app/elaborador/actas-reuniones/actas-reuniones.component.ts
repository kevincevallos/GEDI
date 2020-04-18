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
  listaDOcumentos:any[]=[]
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
    this.service.getDocentes().subscribe(
      (getdatos:any[]) =>  this.listaDocentes = getdatos ,
      (error: HttpErrorResponse) => { console.log(error.message)},
      ()=> console.log('peticion Finalizada',this.listaDocentes))

    this.obtenerFecha()
    this.obtenerFechaS()
    this.reunion.codigoDocumento='ACT-';
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
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.YAV-'+this.dateS+'-'
      }
      if(n==1){
        if(carrera_id==1){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.B.J.M-'+this.dateS+'-'
      }
      if(carrera_id==2){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.24.M.K-'+this.dateS+'-'
      }
      if(carrera_id==3){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.G.C.M-'+this.dateS+'-'
      }
      if(carrera_id==4){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.YAV.AC.V-'+this.dateS+'-'
      }
      if(carrera_id==5){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.YAV.GT.M-'+this.dateS+'-'
      }
      if(carrera_id==6){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.YAV.MK-'+this.dateS+'-'
      }
      if(carrera_id==7){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.YAV.ELT.N-'+this.dateS+'-'
      }
      if(carrera_id==8){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.YAV.ELT.V-'+this.dateS+'-'
      }
      if(carrera_id==9){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.B.J.V-'+this.dateS+'-'
      }
      if(carrera_id==10){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.YAV.AC.M-'+this.dateS+'-'
      }
      if(carrera_id==11){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.YAV.GT.V-'+this.dateS+'-'
      }
      if(carrera_id==12){
        this.actaReunionesCodigoUsuario=this.reunion.codigoDocumento+'I.T.S.DM.V-'+this.dateS+'-'
      }
    }
      this.service.getDocumentos().subscribe(data=>{
        codigoDoc=data['datos'];
        var m;
        if (!codigoDoc) {
          console.log('No hay docs')
          this.actaReunionesCodigoUsuario=this.actaReunionesCodigoUsuario+1;

         }
       for (let i=0;i<codigoDoc.length;i++){
         var t=codigoDoc[i].codigo_documento;
         var elemento=codigoDoc[i];
         console.log(t)
         var n=t.includes('ACT')
         console.log(n);
         if(n){
           this.listaDOcumentos.push(elemento);
         }
       }
       for (let m = 0; m < this.listaDOcumentos.length; m++) {
        const element = this.listaDOcumentos[m];
        console.log('listaDocumentos_:',element);
        
      }
      this.listaDOcumentos.forEach(element => {
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
           this.actaReunionesCodigoUsuario=this.actaReunionesCodigoUsuario+k;
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
 console.log('codigo_:',this.actaReunionesCodigoUsuario) 

   },
    )
  }
}
  //metodos a usar

  obtenerFecha() {
    this.date = new Date();
    this.date = this.datepipe.transform(this.date, 'dd-MM-yyyy');
    return this.date;
  }
   obtenerFechaS(){
   this.dateS= new Date()
   this.dateS=this.datepipe.transform(this.dateS,'yyyy')
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