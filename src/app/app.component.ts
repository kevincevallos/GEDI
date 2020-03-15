import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GEDI';
  mensajeBienvenida = 'Bienvenido a GEDI';

  constructor(private router: Router) { }

  navigateVisualizador(){
    this.router.navigate(['visualizador']);
    console.log("navigateVisualizador");
  }
  navigateElaborador(){
  this.router.navigate(['elaborador']);
  console.log("navigateElaborador");
}

ngOnInit() {
}

}
