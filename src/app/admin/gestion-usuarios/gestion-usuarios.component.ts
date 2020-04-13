import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ServicioService } from 'src/app/servicio.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { UserData } from 'src/app/models/userData';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalComponent } from "../../modal/modal.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from 'src/app/models/user';
interface DialogData {
  id: number;
}
@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})

export class GestionUsuariosComponent implements OnInit {
  id: number;
  name: string;
  email: string;
  value: number;
  sendValue: string;
  user: any;
  usuario: UserData;
  listaUsuarios: UserData[] = [];
  listaRoles = [];
  listaInstitutos = [];
  listaCarreras = [];
  loading: boolean;
  generado:boolean;
  listaCarrerasxUsuario = [];
  displayedColumns = ['id', 'nombre', 'codigo', 'rol', 'email', 'admin'];
  asignado: boolean;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  disablebutton = [false, false]
  //@ViewChild('ref') btn;

  constructor(private service: ServicioService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
    /* 
                    const users: UserData[] = [];
                    for (let i = 1; i <= this.listaUsuarios.length; i++) { 
                      users.push(this.listaUsuarios[i]);
                      //users.push(createNewUser(i)); 
                    }
                
                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(users); */

  }


  openDialog(admin, obj) {
    var codigoUsuario:string;
    //console.log('row',obj);
    obj.admin = admin;
    var username: string = obj.name;
    var rol_id: number = obj.role_id;
    if (rol_id == 1) {
      codigoUsuario = 'COOR';
      console.log('cargo_:', codigoUsuario);
    }
    if (rol_id == 2) {
      codigoUsuario = 'EST';
      console.log('cargo_:', codigoUsuario);
    }
    if (rol_id == 3) {
      codigoUsuario = 'SEC';
      console.log('cargo_:', codigoUsuario);
    }
    if (rol_id == 4) {
      codigoUsuario = 'VIC';
      console.log('cargo_:', codigoUsuario);
    }
    if (rol_id == 5) {
      codigoUsuario = 'ADM';
      console.log('cargo_:', codigoUsuario);
    }
    if (rol_id == 6) {
      codigoUsuario = 'REC';
      console.log('cargo_:', codigoUsuario);
    }
    if (rol_id == 7) {
      codigoUsuario = 'DOC';
      console.log('cargo_:', codigoUsuario);
    }
    if (rol_id == 8) {
      codigoUsuario = 'EVAL';
      console.log('cargo_:', codigoUsuario);
    }
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.updateRowData(result.data);
      if (result) {
        //console.log('Id seleccionado: ',result);
        this.usuario.id = result;
        var n: number = 0;
        var carrera_id;
        this.service.findById(this.usuario).subscribe(data => {
          //console.log('carrera_id_:', data[0].carrera_id);
          carrera_id = data[0].carrera_id;
          for (const key in data) {
            if (data.hasOwnProperty(key))
              n++;
            //console.log('n_:',n);
            //console.log('element_:',data[key]);
          }
          if (n > 1) {
            //console.log('pertenece a varios institutos');
            //console.log('ROL_:',rol_id);
            codigoUsuario = codigoUsuario + 'YAV';

          }
          if (n == 1) {
            //console.log('pertenece a 1 instituto!');
            //console.log('CARRERA_ID:',carrera_id);
            if (carrera_id == 1) {
              codigoUsuario = codigoUsuario + 'DSBJ';
              console.log('Carrera_:', codigoUsuario);
            }
            if (carrera_id == 2) {
              codigoUsuario = codigoUsuario + 'MK24M';
              console.log('Carrera_:', codigoUsuario);
            }
            if (carrera_id == 3) {
              codigoUsuario = codigoUsuario + 'DMGRC';
              console.log('Carrera_:', codigoUsuario);
            }
            if (carrera_id == 4) {
              codigoUsuario = codigoUsuario + 'GTYAV';
              console.log('Carrera_:', codigoUsuario);
            }
            if (carrera_id == 5) {
              codigoUsuario = codigoUsuario + 'ACYAV';
              console.log('Carrera_:', codigoUsuario);
            }
            if (carrera_id == 6) {
              codigoUsuario = codigoUsuario + 'MKYAV';
              console.log('Carrera_:', codigoUsuario);
            }
            if (carrera_id == 7) {
              codigoUsuario = codigoUsuario + 'ASYAV';
              console.log('Carrera_:', codigoUsuario);
            }
            if (carrera_id == 8) {
              codigoUsuario = codigoUsuario + 'ELCYAV';
              console.log('Carrera_:', codigoUsuario);
            }
            if (carrera_id == 9) {
              codigoUsuario = codigoUsuario + 'ELTYAV';
              console.log('Carrera_:', codigoUsuario);
            }
            if (carrera_id == 10) {
              codigoUsuario = codigoUsuario + 'DSBJ';
              console.log('Carrera_:', codigoUsuario);
            }
            if (carrera_id == 11) {
              codigoUsuario = codigoUsuario + 'GNYAV';
              console.log('Carrera_:', codigoUsuario);
            }
            if (carrera_id == 12) {
              codigoUsuario = codigoUsuario + 'DMGRC';
              console.log('Carrera_:', codigoUsuario);
            }
          }
          var num = Math.floor((Math.random() * (9999 - 1)) + 1);
          console.log('ALEATORIO_: ', num);
          codigoUsuario = codigoUsuario + num;
          this.usuario.codigoUser=codigoUsuario.toString();
          console.log('ID_Y_CODIGO_:',this.usuario.id,this.usuario.codigoUser)
          this.updateUser(this.usuario);
          this.openSnackBar('Código: "' + codigoUsuario + '" generado para ' + username, 'OK');
          //console.log('btn_:',this.btn)
          //this.btn._disabled=true;
        },
          //this.navigateToLogin()
          error => {
            this.generado=false;
            this.openSnackBar("Usuario " + username + " no consta en una carrera", 'OK')
            //alert('Error FindById()');
            //console.log('error_postUsuario_:', error)
          }
        )
      } else {
        console.log('no hay datos');
      }
      //this.value = result;
    });
  }
  addtomainrecord(index, row) {
    console.log('index_:', index);
/*     var x = row.codigoUser;
    var y = row.id;
    console.log('row_:', y);
    if (x) {
      console.log('x,y_:',x,y)
      this.disablebutton[y] = true;
    } */
    /* if (y == index&&this.generado) {
      this.disablebutton[y] = true;
      this.generado=false;
    } */
    //rest of the code follows
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
    this.llenarTabla();
  }
  updateUser(usuario: UserData){
    this.service.updateUser(usuario).subscribe(data => {
      },
      //this.navigateToLogin()
      error => {
        //this.generado=false;
        //this.openSnackBar("Usuario " + username + " no consta en una carrera", 'OK')
        //alert('Error updateUser()');
        console.log('error_updateUser_:', error)
      }
    )
  }
  ngOnInit() {
    const ELEMENT_DATA: UserData[] = [];
    this.loading = true;
    this.user = this.service.getCurrentUser();
    this.usuario = this.user;
    let rol = this.user.role_id;
    if (rol != 6) {
      this.router.navigate(["/acceso-denegado"]);
    }

    this.llenarTabla();
    /* this.dataSource.filterPredicate = (data: UserData, filter: string) => {
      return data.name == filter;
     }; */

    //console.log('GestionUsuarios_ROL_:',rol);
    /*     this.service.getRoles().subscribe(
          (getdatos: any[]) => this.listaRoles = getdatos,
          (error: HttpErrorResponse) => { console.log(error.message) })
    
        this.service.getInstitutos().subscribe(
          (getdatos: any[]) => this.listaInstitutos = getdatos,
          (error: HttpErrorResponse) => { console.log(error.message) })
    
        this.service.getCarreras().subscribe(
          (getdatos: any[]) => this.listaCarreras = getdatos,
          (error: HttpErrorResponse) => { console.log(error.message) })
    
        this.service.getCarrerasxUsuario().subscribe(
          (getdatos: any[]) => this.listaCarrerasxUsuario = getdatos,
          (error: HttpErrorResponse) => { console.log(error.message) }) */




    /*       this.dataSource.filterPredicate = function(data, filter: string): boolean {
            return data.name.toLowerCase().includes(filter) || data.email.toLowerCase().includes(filter)||
             data.codigoUser.toLowerCase().includes(filter);
          }; */

  }
  llenarTabla(){
        const ELEMENT_DATA: UserData[] = [];
        //Llenar tabla de usuarios
        console.log('LLENAR_TABLA()');
        this.service.getUsers()
        .subscribe(response => {
          var n: number = 0, key;
          //console.log('esto es n_: ',n)
          for (key in response) {
            if (response.hasOwnProperty(key))
              n++;
          }
          for (let i = 0; i <= n - 1; i++) {
            ELEMENT_DATA.push(response[i]);
            var x = response[i].codigo_user;
            var y = response[i].id;
            if (x) {
              console.log('x,y_:',x,y)
              this.disablebutton[y] = true;
            }
          }
          this.loading = false;
          this.dataSource.data = ELEMENT_DATA;
        });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    /*  const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
    */
    //console.log(event);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

/*   generarCodigo(row: number) {
    var id_usuario = row;
    var user: UserData;
    this.usuario.id = id_usuario;
    console.log('usuario.id_:', this.usuario.id);
    var nombre_usuario = row;
    var usuario_carrera_id;
    var user_id;
    var carrera_id;
    var instituto_id;
    var nombre_carrera;
    var instituto_nombre;
    var id_instituto_user;




       this.listaCarrerasxUsuario.forEach(element => {
       user_id = element.user_id;
       //usuario_carrera_id = element.carrera_id;
       if (user_id == id_usuario) {
         usuario_carrera_id = element.carrera_id
         //console.log('user_id+usuario_carrera_id',user_id,usuario_carrera_id);
       } else {
         this.asignado = false;
       }
     });
     this.listaCarreras.forEach(element => {
       carrera_id = element.id;
       nombre_carrera = element.nombre;
       instituto_id = element.instituto_id;
       if (usuario_carrera_id == carrera_id) {
         //console.log('carrera_id', carrera_id);
         //console.log('instituto_id', instituto_id);
         console.log('nombreCarrera:', nombre_carrera);
       } else {
         this.asignado = false;
       }
     });
     this.listaInstitutos.forEach(element => {
       instituto_nombre = element.nombre;
       id_instituto_user = element.id;
       if (id_instituto_user == instituto_id) {
         this.asignado = true;
         console.log(instituto_nombre, id_instituto_user);
       } else {
         this.asignado = false;
       }
     });
     //console.log('código generado!!', id_usuario);
     if (this.asignado) {
       alert('Código generado con éxito');
 
     } else {
       alert('Usuario no asignado');
 
     }
  } */
}
const ELEMENT_DATA: UserData[] = [];



