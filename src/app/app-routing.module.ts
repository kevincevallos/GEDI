import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizadorComponent } from "./visualizador/visualizador.component";
import { ElaboradorComponent } from "./elaborador/elaborador.component";

const routes: Routes = [
   {path:"visualizador",component:VisualizadorComponent},
   {path:"elaborador",component:ElaboradorComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
