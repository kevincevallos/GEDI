import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elaborador',
  templateUrl: './elaborador.component.html',
  styleUrls: ['./elaborador.component.css']
})
export class ElaboradorComponent implements OnInit {

  constructor(public service: ServicioService,
    public router: Router) { 
  }

  ngOnInit() {
  }

 
}
