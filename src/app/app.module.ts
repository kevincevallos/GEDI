import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { ServicioService } from "./servicio.service";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualizadorComponent } from './visualizador/visualizador.component';
import { ElaboradorComponent } from './elaborador/elaborador.component';
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbThemeModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatButtonModule } from  '@angular/material/button';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule, MatFormField } from  '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { DatePipe } from '@angular/common';
import { ActasComponent } from './elaborador/actas/actas.component';
import { MemorandumsComponent } from './elaborador/memorandums/memorandums.component';
import { OficiosComponent } from './elaborador/oficios/oficios.component';
import { SolicitudesComponent } from './elaborador/solicitudes/solicitudes.component';
import { HojaDeVidaComponent } from './elaborador/hoja-de-vida/hoja-de-vida.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from "@angular/material/icon";
import { ActasReunionesComponent } from './elaborador/actas-reuniones/actas-reuniones.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { SolicitudesTitulacionComponent } from './elaborador/solicitudes-titulacion/solicitudes-titulacion.component';
import { GestionUsuariosComponent } from './admin/gestion-usuarios/gestion-usuarios.component';
import { AccesoDenegadoComponent } from './admin/acceso-denegado/acceso-denegado.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { CardsComponent } from './visualizador/cards/cards.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule} from  '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    VisualizadorComponent,
    ElaboradorComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    ActasComponent,
    MemorandumsComponent,
    OficiosComponent,
    SolicitudesComponent,
    HojaDeVidaComponent,
    ActasReunionesComponent,
    SolicitudesTitulacionComponent,
    GestionUsuariosComponent,
    AccesoDenegadoComponent,
    ModalComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSortModule,
    NgbModule,
    MatCardModule
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [ServicioService, DatePipe],
  bootstrap: [AppComponent]

})
export class AppModule { }
