import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.component.html',
  styleUrls: ['./visualizador.component.css']
})
export class VisualizadorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  agregarMensaje(){
    console.log('Hola Visualizador!°');
  }
}
