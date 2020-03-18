import { Component, OnInit } from '@angular/core';
import { Request, Response } from 'express';
//import { pool } from '../database';
import { QueryResult } from 'pg';
import { ServicioService } from '../servicio.service';


@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.component.html',
  styleUrls: ['./visualizador.component.css']
})
export class VisualizadorComponent implements OnInit {
  users:any;

  constructor(private service: ServicioService) { }

  ngOnInit(){
    
  this.service.getUsers()
  .subscribe(
    data => {
      console.log('|VisualizadorComponent.getUsers()!|');
      this.users = data;
      console.log(this.users);

    },
    (error) => {
      console.error(error);
    }
  );
  }

  agregarMensaje(){
    console.log('Hola Visualizador!°');
  }
}
