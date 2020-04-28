import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizadorComponent } from "./visualizador/visualizador.component";
import { ElaboradorComponent } from "./elaborador/elaborador.component";
import { LoginComponent } from "./login/login.component";
import { OficiosComponent } from './elaborador/oficios/oficios.component';
import { ActasComponent } from './elaborador/actas/actas.component';
import { MemorandumsComponent } from './elaborador/memorandums/memorandums.component';
import { HojaDeVidaComponent } from './elaborador/hoja-de-vida/hoja-de-vida.component';
import { ActasReunionesComponent } from './elaborador/actas-reuniones/actas-reuniones.component';
import { SolicitudesTitulacionComponent } from './elaborador/solicitudes-titulacion/solicitudes-titulacion.component';
import { AuthGuard } from './guards/auth.guard';
import { GestionUsuariosComponent } from './admin/gestion-usuarios/gestion-usuarios.component';
import { AccesoDenegadoComponent } from './admin/acceso-denegado/acceso-denegado.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
   {path:"visualizador",component:VisualizadorComponent, canActivate: [AuthGuard] },
   {path:"elaborador",component:ElaboradorComponent, canActivate: [AuthGuard] },
   {path:"oficios",component:OficiosComponent, canActivate: [AuthGuard] },
   {path:"actas",component:ActasComponent, canActivate: [AuthGuard] },
   {path:"memorandums",component:MemorandumsComponent, canActivate: [AuthGuard] },
   {path:"hojasDeVida",component:HojaDeVidaComponent, canActivate: [AuthGuard] },
   {path:"actasReuniones",component:ActasReunionesComponent, canActivate: [AuthGuard] },
   {path:"solicitudes-titulacion",component:SolicitudesTitulacionComponent, canActivate: [AuthGuard] },
   {path:"gestion-usuarios",component:GestionUsuariosComponent, canActivate: [AuthGuard] },
   {path:"acceso-denegado",component:AccesoDenegadoComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
